import { create } from 'zustand';
import {
  signUpService,
  signInService,
  fetchUserService,
  validateTokenService,
  refreshTokenService
} from '../services/AuthServices';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthTokenInAxios } from '../utils/ManageAxios';

const initialState = {
  user: null,
  userTokensData: null,
  loading: {
    login: false,
    signup: false,
    refresh: false
  },
  error: {
    login: null,
    signup: null
  },
  isHydrated: false
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      clearErrors: () => set({ error: initialState.error }),

      signup: async (payload) => {
        set({ loading: { ...get().loading, signup: true }, error: { ...get().error, signup: null } });
        try {
          const res = await signUpService(payload);
          set({ loading: { ...get().loading, signup: false } });
          return res;
        } catch (error) {
          set({ loading: { ...get().loading, signup: false }, error: { ...get().error, signup: error.message } });
          return { success: false, message: error.message };
        }
      },

      login: async (payload) => {
        set({ loading: { ...get().loading, login: true }, error: { ...get().error, login: null } });
        try {
          const res = await signInService(payload);
          
          if (!res.success) {
            throw new Error(res.message || 'Login failed');
          }

          setAuthTokenInAxios(res.data.data.accessToken);
          set({ userTokensData: res.data.data });

          const userResponse = await fetchUserService();
          if (!userResponse.success) {
            throw new Error(userResponse.message || 'Failed to fetch user data');
          }

          set({
            user: userResponse.data.data,
            loading: { ...get().loading, login: false },
          });
          return { success: true };
        } catch (error) {
          set({
            user: null,
            loading: { ...get().loading, login: false },
            error: { ...get().error, login: error.message }
          });
          return { success: false, message: error.message };
        }
      },

      refreshAccessToken: async (silent = true) => {
        const { userTokensData, user } = get();
        if (!userTokensData || !user) return;

        try {
          if (!silent) set({ loading: { ...get().loading, refresh: true } });

          const validation = await validateTokenService();
          
          if (validation.success) {
            set({ user, userTokensData });
            return;
          }

          setAuthTokenInAxios(userTokensData.refreshToken);
          const refreshRes = await refreshTokenService();
          
          if (!refreshRes.success) {
            throw new Error('Token refresh failed');
          }

          setAuthTokenInAxios(refreshRes.data.data.accessToken);
          set({ userTokensData: refreshRes.data.data });

          const userResponse = await fetchUserService();
          if (!userResponse.success) {
            throw new Error('Failed to fetch user after refresh');
          }

          set({ user: userResponse.data.data });
        } catch (error) {
          set({ user: null, userTokensData: null });
          setAuthTokenInAxios(null);
        } finally {
          if (!silent) set({ loading: { ...get().loading, refresh: false } });
          set({ isHydrated: true });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          userTokensData: null,
          loading: initialState.loading,
          error: initialState.error
        });
        setAuthTokenInAxios(null);
      },

      setHydrated: () => set({ isHydrated: true })
    }),
    {
      name: 'AuthUserDataStorage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => async (state) => {
        state.isHydrated = false;
        if (state.user && state.userTokensData) {
          setAuthTokenInAxios(state.userTokensData.accessToken);
          await state.refreshAccessToken(true); 
        } else {
          state.isHydrated = true;
          state.user = null;
          state.userTokensData = null;
        }
      }
    }
  )
);

export default useAuthStore;