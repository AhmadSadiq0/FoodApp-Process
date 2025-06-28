import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserOrderStore from './UserStore';
import { 
  fetchOrdersService, 
  createOrderService, 
  updateOrderService, 
  deleteOrderService 
} from '../services/ServiceOrder';

const initialState = {
  orders: [],
  selectedOrder: null,
  orders_loading: false,
  orders_error: null,
};

const useOrderStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      fetchOrders: async () => {
        set({ orders_loading: true, orders_error: null });
        try {
          const response = await fetchOrdersService();
          if (response?.success && response?.data?.data) {
            set({ 
              orders: Array.isArray(response.data.data) ? response.data.data : [response.data.data],
              orders_loading: false 
            });
            const currentSelected = get().selectedOrder;
            if (currentSelected) {
              const orderStillExists = response.data.data.some(
                order => order._id === currentSelected._id
              );
              if (!orderStillExists) {
                set({ selectedOrder: null });
              }
            } else {
              set({ selectedOrder: response.data.data[0] });
            }
          } else {
            set({
              orders_loading: false,
              orders_error: response.message,
            });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ 
            orders: [], 
            orders_loading: false, 
            orders_error: error.message 
          });
        }
      },

      createOrder: async (orderData) => {
        set({ orders_loading: true, orders_error: null });
        console.log('Creating order with data:', orderData);
        try {
          const response = await createOrderService(orderData);
          console.log('Create order response:', response); 
          if (response.success) {
            set(state => ({ 
              orders: [...state.orders, response.data], 
              orders_loading: false 
            }));
            if(!useUserOrderStore.getState().userOrders.length == 0) {
              useUserOrderStore.getState().addUserOrder(response.data);
            }
            return { success: true, data: response.data };
          } else {
            set({ orders_loading: false, orders_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ orders_loading: false, orders_error: error.message });
          return { success: false, error: error.message };
        }
      },

      updateOrder: async (orderId, orderData) => {
        set({ orders_loading: true, orders_error: null });
        try {
          const response = await updateOrderService(orderId, orderData);
          if (response.success) {
            set(state => ({
              orders: state.orders.map(order =>
                order._id === orderId ? response.data : order
              ),
              orders_loading: false,
              selectedOrder: state.selectedOrder?._id === orderId
                ? response.data
                : state.selectedOrder
            }));
            return { success: true, data: response.data };
          } else {
            set({ orders_loading: false, orders_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ orders_loading: false, orders_error: error.message });
          return { success: false, error: error.message };
        }
      },

      deleteOrder: async (orderId) => {
        set({ orders_loading: true, orders_error: null });
        try {
          const response = await deleteOrderService(orderId);
          if (response.success) {
            set(state => ({
              orders: state.orders.filter(order => order._id !== orderId),
              orders_loading: false,
              selectedOrder: state.selectedOrder?._id === orderId ? null : state.selectedOrder
            }));
            return { success: true };
          } else {
            set({ orders_loading: false, orders_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ orders_loading: false, orders_error: error.message });
          return { success: false, error: error.message };
        }
      },

      setSelectedOrder: (order) => set({ selectedOrder: order }),
      clearSelectedOrder: () => set({ selectedOrder: null }),
      clearOrders: () => set({ orders: [], selectedOrder: null, orders_error: null }),
      resetStore: () => set(initialState),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => ({
        selectedOrder: state.selectedOrder,
      }),
    }
  )
);

export default useOrderStore;
