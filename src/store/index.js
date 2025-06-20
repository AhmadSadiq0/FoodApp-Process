// Guides:

// This folder is related to state management. 
// It contains files for state management libraries, handling the global state of the APP.

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
        signup: false
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

            signup: async (payload) => {
                set({ loading: { ...get().loading, signup: true }, error: { ...get().error, signup: null } });
                try {
                    const res = await signUpService(payload);
                    set({ loading: { ...get().loading, signup: false }, error: { ...get().error, signup: res.message } });
                } catch (error) {
                    set({ loading: { ...get().loading, signup: false }, error: error.message });
                }
            },
            login: async (payload) => {
                set({ loading: { ...get().loading, login: true }, error: { ...get().error, login: null } });
                try {
                    const res = await signInService(payload);
                    if (res.success) {
                        setAuthTokenInAxios(res.data.data.accessToken);
                        set({ userTokensData : res.data.data })
                        const response = await fetchUserService();
                        if (response.success) {
                            set(() => ({
                                user: response.data.data,
                                loading: { ...get().loading, login: false },
                            }));
                        } else {
                            set(() => ({
                                user: null,
                                loading: { ...get().loading, login: false },
                                error: { ...get().error, login: response.status == 400 ? "User not found" : response.message + response.status }
                            }));
                        }
                    } else {
                        set(() => ({
                            user: null,
                            loading: { ...get().loading, login: false },
                            error: { ...get().error, login: res.status == 400 ? "Email or password is incorrect" : res.message }
                        }));
                    }
                } catch (error) {
                    set(() => ({
                        user: null,
                        loading: { ...get().loading, login: false },
                        error: { ...get().error, login: error.message }
                    }));
                }
            },


            updateUser: async (payload) => {
                set({ loading: true, error: null });
                try {
                    const res = await updateUserService(payload);
                    if (res.success) {
                        set((state) => ({
                            user: { ...state.user, ...res.data },
                            loading: false
                        }));
                        return res;
                    } else {
                        set({ loading: false, error: res.message });
                        return res;
                    }
                } catch (error) {
                    set({ loading: false, error: error.message });
                    return { success: false, message: error.message };
                }
            },

            refreshAccessToken: async () => {
                const storedUser = get().user;
                const storedUserTokensData = get().userTokensData
                if (!storedUserTokensData || !storedUser ) return;

                try {
                    const validation = await validateTokenService();
                    console.log("this is validation respones", validation)

                    if (validation.success) {
                        console.log("token is valid")
                        set({ user: storedUser , userTokensData : storedUserTokensData });
                    } else {
                        setAuthTokenInAxios(storedUserTokensData.refreshToken)
                        const refreshRes = await refreshTokenService();
                        console.log(refreshRes)
                        if (refreshRes.success) {
                            setAuthTokenInAxios(refreshRes.data.data.accessToken);
                            set({userTokensData : refreshRes.data.data})
                            const response = await fetchUserService();
                            if (response.success) {
                                set(() => ({
                                    user: response.data.data
                                }));
                            } else {
                                set({ user: null });
                                setAuthTokenInAxios(null);
                            }
                        } else {
                            set({ user: null });
                            setAuthTokenInAxios(null);
                        }
                    }
                } catch (error) {
                    set({ user: null });
                    setAuthTokenInAxios(null);
                } finally {
                    set({ isHydrated: true })
                }
            },

            logout: () => {
                set({ user: null, userData: null, error: null });
                setAuthTokenInAxios(null);
            },
            setHydrated: () => set({ isHydrated: true })
        }),
        {
            name: 'FOSUserDataStorage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => async (state) => {
                state.isHydrated = false
                if (state && state.user && state.userTokensData) {
                    setAuthTokenInAxios(state.userTokensData.accessToken)
                    await state.refreshAccessToken();
                } else {
                    state.isHydrated = true
                    state.user = null,
                    state.userTokensData = null
                }
            }
        }
    )
);
export default useAuthStore;

