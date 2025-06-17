import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    markNotificationAsReadService,
    createNotificationService,
    fetchNotificationsService,
    updateNotificationService,
    deleteNotificationService,
   } from '../services/NotificationService';
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const useNotificationStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      // Create a new notification
      createNotification: async (notificationData) => {
        set({ loading: true, error: null });
        try {
            console.log('Creating notification:', notificationData);
          const response = await createNotificationService(notificationData);
          if (response.success) {
            set((state) => ({
              notifications: [response.data, ...state.notifications],
              unreadCount: state.unreadCount + 1,
              loading: false
            }));
            return { success: true, data: response.data };
          } else {
            set({ loading: false, error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ loading: false, error: error.message });
          return { success: false, error: error.message };
        }
      },

      // Fetch all notifications for a user
      fetchNotifications: async (userId) => {
        set({ loading: true, error: null });
        try {
          const response = await fetchNotificationsService(userId);
          if (response.success) {
            const unreadCount = response.data.filter(n => !n.seen).length;
            set({ 
              notifications: response.data.data,
              unreadCount,
              loading: false 
            });
          } else {
            set({ 
              notifications: [],
              unreadCount: 0,
              loading: false,
              error: response.message 
            });
          }
        } catch (error) {
          set({ 
            notifications: [],
            unreadCount: 0,
            loading: false,
            error: error.message 
          });
        }
      },

      // Mark notification as read
      markNotificationAsRead: async (notificationId, userId) => {
        set({ loading: true, error: null });
        try {
          const response = await markNotificationAsReadService(notificationId, userId);
          if (response.success) {
            set((state) => ({
              notifications: state.notifications.map(notification => 
                notification._id === notificationId 
                  ? { ...notification, seen: true } 
                  : notification
              ),
              unreadCount: Math.max(0, state.unreadCount - 1),
              loading: false
            }));
            return { success: true, data: response.data };
          } else {
            set({ loading: false, error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ loading: false, error: error.message });
          return { success: false, error: error.message };
        }
      },

      // Delete a notification
      deleteNotification: async (notificationId) => {
        set({ loading: true, error: null });
        try {
          const response = await deleteNotificationService(notificationId);
          if (response.success) {
            set((state) => {
              const notificationToDelete = state.notifications.find(n => n._id === notificationId);
              const wasUnread = notificationToDelete ? !notificationToDelete.seen : false;
              
              return {
                notifications: state.notifications.filter(n => n._id !== notificationId),
                unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
                loading: false
              };
            });
            return { success: true };
          } else {
            set({ loading: false, error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ loading: false, error: error.message });
          return { success: false, error: error.message };
        }
      },

      // Clear all notifications
      clearNotifications: () => set({ 
        notifications: [],
        unreadCount: 0,
        error: null 
      }),

      // Reset entire store to initial state
      reset: () => set(initialState),
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useNotificationStore;