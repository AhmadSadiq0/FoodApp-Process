import { create } from 'zustand';
import { updateUserDataService } from '../services/ProfileUpdateService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUpdateProfileStore = create((set, get) => ({
  isUpdating: false,
  message: null,
  isSuccess: false,
  error: null,
  userData: null,

  // Initialize user data
  initializeUserData: async (initialData) => {
    try {
      const storedData = await AsyncStorage.getItem('userProfileData');
      if (storedData) {
        set({ userData: JSON.parse(storedData) });
      } else if (initialData) {
        set({ userData: initialData });
        await AsyncStorage.setItem('userProfileData', JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  },

  // Update profile function
  updateProfile: async (userData) => {
    set({ isUpdating: true, message: null, error: null });
    
    try {
      const result = await updateUserDataService(userData);
      
      if (result.success) {
        // Update local storage and state
        const updatedData = { ...get().userData, ...userData };
        await AsyncStorage.setItem('userProfileData', JSON.stringify(updatedData));
        
        set({ 
          isSuccess: true, 
          message: "Profile updated successfully.",
          error: null,
          userData: updatedData
        });
        return { success: true, data: updatedData };
      } else {
        set({ 
          isSuccess: false, 
          message: result.message || "Update failed.",
          error: result.message 
        });
        return { success: false, error: result.message };
      }
    } catch (error) {
      set({ 
        isSuccess: false, 
        message: "Failed to update profile.",
        error: error.message 
      });
      return { success: false, error: error.message };
    } finally {
      set({ isUpdating: false });
    }
  },

  // Get current user data
  getUserData: () => get().userData,

  // Clear message
  clearMessage: () => set({ message: null, error: null }),

  // Reset state
  reset: () => set({ 
    isUpdating: false, 
    message: null, 
    isSuccess: false, 
    error: null 
  }),
}));

export default useUpdateProfileStore; 