// src/stores/UserOrderStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchUserOrdersService } from '../services/ServiceUserOrders';
import { fetchUserOrdersService } from '../services/userOrderService';

const initialState = {
  userOrders: [],
  userOrders_loading: false,
  userOrders_error: null,
};

const useUserOrderStore = create((set, get) => ({
      ...initialState,

      // Fetch orders for a specific user
      fetchUserOrders: async () => {
        set({ userOrders_loading: true, userOrders_error: null });
        try {
          const response = await fetchUserOrdersService();
          if (response?.success) {
            console.log("User Orders are ", response.data);
            set({ 
              userOrders: Array.isArray(response.data.data) ? response.data.data : [response.data.data],
              userOrders_loading: false 
            });
            return { success: true, data: response.data };
          } else {
            set({
              userOrders_loading: false,
              userOrders_error: response.message,
            });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ 
            userOrders: [], 
            userOrders_loading: false, 
            userOrders_error: error.message 
          });
          return { success: false, error: error.message };
        }
      },

      addUserOrder: (order) => {
        set((state) => ({
          userOrders: [...state.userOrders, order],
        }));
      },

      // Clear user orders
      clearUserOrders: () => set({ 
        userOrders: [], 
        userOrders_error: null 
      }),

      // Reset the entire store
      resetStore: () => set(initialState),
    }),
    {
      name: 'user-order-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
);

export default useUserOrderStore;