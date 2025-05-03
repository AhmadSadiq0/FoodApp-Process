



import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchExtrasByBranchService } from '../services/ServiceExtras';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  extras: [],
  extras_loading: false,
  extras_error: null,
  currentBranchId: null,
  selectedExtras: [],
};

const useExtraStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Fetch extras by branch (existing)
      fetchExtrasByBranch: async (branchId) => {
        set({ 
          extras_loading: true, 
          extras_error: null,
          currentBranchId: branchId 
        });
        
        try {
          const response = await fetchExtrasByBranchService(branchId);
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

      // Add or toggle extra
      toggleExtra: (extra) => set((state) => {
        const exists = state.selectedExtras.some(e => e._id === extra._id);
        if (exists) {
          return {
            selectedExtras: state.selectedExtras.filter(e => e._id !== extra._id)
          };
        } else {
          return {
            selectedExtras: [...state.selectedExtras, { ...extra, quantity: 1 }]
          };
        }
      }),
      
      // Update quantity for a specific extra
      updateExtraQuantity: (extraId, newQuantity) => set((state) => ({
        selectedExtras: state.selectedExtras.map(extra => 
          extra._id === extraId 
            ? { ...extra, quantity: newQuantity } 
            : extra
        )
      })),
      
      // Clear selected extras
      clearSelectedExtras: () => set({ selectedExtras: [] }),

      // Clear all extras data
      clearExtras: () => set({ 
        extras: [], 
        extras_error: null,
        currentBranchId: null,
        selectedExtras: [] 
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