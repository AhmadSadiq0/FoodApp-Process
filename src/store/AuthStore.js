import { create } from 'zustand';
import { 
    signUpService, 
    signInService, 
    fetchUserService
} from '../services/AuthServices'; 

import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthTokenInAxios } from '../utils/ManageAxios';

const initialState = {
    user: null,
    userData: null,
    loading: false,
    error: null    
};

const useAuthStore = create(
    persist(
        (set) => ({
            ...initialState,

            signup: async (payload) => {
                set({ loading: true, error: null });
                try {
                    const res = await signUpService(payload);
                    set({ loading: false });
                    return res;
                } catch (error) {
                    set({ loading: false, error: error.message });
                    return { success: false, message: error.message };
                }
            },
            login: async (payload) => {
                set({ loading: true, error: null });
                try {
                    const res = await signInService(payload);
                    
                    if (res.success) {
                        setAuthTokenInAxios(res.data.data.accessToken);
                        
                        const response = await fetchUserService();
                        if (response.success) {
                            set(() => ({
                                user: response.data.data,
                                loading: false
                            }));
                            return response.data;
                        } else {
                            set(() => ({
                                user: null,
                                loading: false,
                                error: response.message
                            }));
                            return { success: false, message: response.message };
                        }
                    } else {
                        set(() => ({
                            user: null,
                            loading: false,
                            error: res.message
                        }));
                        return { success: false, message: res.message };
                    }
                } catch (error) {
                    set(() => ({
                        user: null,
                        loading: false,
                        error: error.message
                    }));
                    return { success: false, message: error.message };
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

            logout: () => {
                set({ user: null, userData: null, error: null });
                setAuthTokenInAxios(null); // Clear the auth token
            },
        }),
        {
            name: 'FOSUserDataStorage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                 if (state) state.user = null;
            }
        } 
    )
);
export default useAuthStore;
