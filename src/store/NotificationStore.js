import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    markNotificationAsReadService,
    createNotificationService,
    fetchNotificationsService,
    updateNotificationService,
    deleteNotificationService,
    saveExpoPushTokenService,
   } from '../services/NotificationService';
import useAuthStore from './AuthStore';
const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  expoPushToken: null,
};

const useNotificationStore = create((set, get) => ({
      ...initialState,
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
      fetchNotifications: async () => {
        if (get().notifications.length > 0) {
          return;
        }

        set({ loading: true, error: null });
        try {
          const response = await fetchNotificationsService();
          if (response.success) {
            const notifications = response.data || [];
            const unreadCount = notifications.reduce((count, notification) => {
              const currentUserId = useAuthStore.getState().user._id;
              const recipient = notification.recipients && notification.recipients.find(r => r.userId == currentUserId);
              return count + (recipient && !recipient.seen ? 1 : 0);
            }, 0);

            console.log("this is unread count" , unreadCount)
            set({ 
              notifications: notifications?.toReversed(),
              unreadCount,
              loading: false 
            });
          } else {
            set({ 
              loading: false,
              error: response.message 
            });
          }
        } catch (error) {
          set({ 
            loading: false,
            error: error.message 
          });
        }
      },

      // Mark notification as read
      markNotificationAsRead: async (notificationId) => {
        try {
          const response = await markNotificationAsReadService(notificationId);
          console.log('Mark notification as read service response:', response);
          if (response.success) {
            set((state) => ({
              unreadCount: Math.max(0, state.unreadCount - 1),
            }));
            console.log('Mark notification as read response:', response);
            return { success: true, data: response.data };
          } else {
            return { success: false, error: response.message };
          }
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      markAllAsRead: async () => {
        const { notifications } = get();
        const unreadNotifications = notifications.filter(
          (n) => n.recipients && n.recipients.some((r) => !r.seen)
        );
    
        if (unreadNotifications.length === 0) {
          return { success: true };
        }
    
        set({ loading: true, error: null });
    
        try {
          const markAsReadPromises = unreadNotifications.map((notification) => {
            const recipient = notification.recipients.find((r) => !r.seen);
            if (recipient) {
              return markNotificationAsReadService(notification._id, recipient.userId);
            }
            return Promise.resolve({ success: true }); // Should not happen based on filter
          });
    
          const results = await Promise.all(markAsReadPromises);
    
          const allSuccessful = results.every((res) => res.success);
    
          if (allSuccessful) {
            set((state) => ({
              notifications: state.notifications.map((n) => ({
                ...n,
                recipients: n.recipients.map((r) => ({ ...r, seen: true })),
              })),
              unreadCount: 0,
              loading: false,
            }));
            return { success: true };
          } else {
            // If some failed, fetch from server to get consistent state
            get().fetchNotifications(true);
            return { success: false, error: "Some notifications could not be marked as read." };
          }
        } catch (error) {
          set({ loading: false, error: error.message });
          get().fetchNotifications(true); // fetch fresh data in case of error
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

      clearNotifications: () => set({ 
        notifications: [],
        unreadCount: 0,
        error: null 
      }),

      reset: () => set(initialState),

      saveExpoPushToken: async (token) => {
        set({ loading: true, error: null });
        try {
          const response = await saveExpoPushTokenService(token);
          console.log('Save Expo push token response:', response);
          if (response.success) {
            set({ expoPushToken: token, loading: false });
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
    })
);

export default useNotificationStore;