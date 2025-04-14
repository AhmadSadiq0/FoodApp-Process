import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchExtrasByBranchService } from '../services/ServiceExtras';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  extras: [],
  extras_loading: false,
  extras_error: null,
  currentBranchId: null,
};
const useExtraStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      // Fetch extras by branch
      fetchExtrasByBranch: async (branchId) => {
        set({ 
          extras_loading: true, 
          extras_error: null,
          currentBranchId: branchId 
        });
        
        try {
          const response = await fetchExtrasByBranchService(branchId);
          console.log("response", response.data)
          if (response.success) {
            set({ 
              extras: response.data.data, 
              extras_loading: false 
            });
          } else {
            set({ 
              extras: [], 
              extras_loading: false, 
              extras_error: response.message 
            });
          }
        } catch (error) {
          set({ 
            extras: [], 
            extras_loading: false, 
            extras_error: error.message 
          });
        }
      },

      // Clear extras data
      clearExtras: () => set({ 
        extras: [], 
        extras_error: null,
        currentBranchId: null
      }),

      // Reset entire store to initial state
      resetStore: () => set(initialState),
    }),
    {
      name: 'extra-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useExtraStore;