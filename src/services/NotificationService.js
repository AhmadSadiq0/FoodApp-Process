import { 
    postRequest, 
    getRequest, 
    putRequest, 
    deleteRequest 
  } from './ServiceModel';
  import { 
    URL_TO_CREATE_NOTIFICATION,
    URL_TO_GET_NOTIFICATIONS,
    URL_TO_UPDATE_NOTIFICATION,
    URL_TO_DELETE_NOTIFICATION,
    URL_TO_MARK_NOTIFICATION_AS_READ,
    URL_TO_SAVE_EXPO_PUSH_TOKEN
  } from "../res/api";
  
  // Create a new notification
  const createNotificationService = async (notificationData) => {
    console.log('Creating notification:', notificationData);
    try {
     
      const response = await postRequest(URL_TO_CREATE_NOTIFICATION, notificationData);

      console.log('Create notification response:', response);
  
      if (response.status || response.success ) {
        console.log('Notification creation successful.');
        return {
          success: true,
          data: response.data,
          message: response.msg || 'Notification created successfully.'
        };
      } else {
        console.log('Failed to create notification. Response:', response);
        return {
          success: false,
          data: null,
          message: response.msg || 'Failed to create notification.'
        };
      }
    } catch (error) {
      console.log('Caught error while creating notification:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to create notification.'
      };
    }
  };
  
  // Fetch all notifications for a user
  const fetchNotificationsService = async () => {
    try {
      const response = await getRequest(`${URL_TO_GET_NOTIFICATIONS}`);
     console.log('Notifications response:', response);
      
      if (response.status && response.data.status) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.msg || 'Notifications fetched successfully.'
        };
      } else {
        return {
          success: false,
          data: [],
          message: response.data?.msg || 'Failed to fetch notifications.'
        };
      }
    } catch (error) {
      console.log('Caught error while fetching notifications:', error);
      return {
        success: false,
        data: [],
        message: error.message || 'Failed to fetch notifications.'
      };
    }
  };
  
  // Update a notification
  const updateNotificationService = async (notificationId, updateData) => {
    try {
      const response = await putRequest(`${URL_TO_UPDATE_NOTIFICATION}/${notificationId}`, updateData);
  
      if (response.status) {
        return {
          success: true,
          data: response.data,
          message: response.msg || 'Notification updated successfully.'
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.msg || 'Failed to update notification.'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to update notification.'
      };
    }
  };
  
  // Delete a notification
  const deleteNotificationService = async (notificationId) => {
    try {
      const response = await deleteRequest(`${URL_TO_DELETE_NOTIFICATION}/${notificationId}`);
  
      if (response.status) {
        return {
          success: true,
          data: response.data,
          message: response.msg || 'Notification deleted successfully.'
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.msg || 'Failed to delete notification.'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to delete notification.'
      };
    }
  };
  
  // Mark notification as read
  const markNotificationAsReadService = async (notificationId, userId) => {
    try {
      const response = await putRequest(`${URL_TO_MARK_NOTIFICATION_AS_READ}/${notificationId}`, { userId });
  
      if (response.status) {
        return {
          success: true,
          data: response.data,
          message: response.msg || 'Notification marked as read.'
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.msg || 'Failed to mark notification as read.'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to mark notification as read.'
      };
    }
  };
  
  // Save Expo push token for user
  const saveExpoPushTokenService = async (token) => {
    try {
      const response = await postRequest(URL_TO_SAVE_EXPO_PUSH_TOKEN, { token });
      if (response.status || response.success) {
        return {
          success: true,
          data: response.data,
          message: response.msg || 'Token saved successfully.'
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.msg || 'Failed to save token.'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to save token.'
      };
    }
  };
  
  export {
    createNotificationService,
    fetchNotificationsService,
    updateNotificationService,
    deleteNotificationService,
    markNotificationAsReadService,
    saveExpoPushTokenService
  };