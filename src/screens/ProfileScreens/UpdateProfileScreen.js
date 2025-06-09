// UpdateProfileScreen.js
import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { TextInputProfile } from "../../components";
import { Back_Ground, DARK_THEME_BACKGROUND } from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import useAuthStore from "../../store/AuthStore";
import useUpdateProfileStore from "../../store/UpdateProfileStore";

const UpdateProfileScreen = (props) => {
  const { user, setUser } = useAuthStore();
  const { navigation, route } = props;
  const { darkMode } = useThemeStore();
  const showEditIcon = route?.params?.showEditIcon ?? true;
  
  const { 
    isUpdating, 
    message, 
    isSuccess, 
    updateProfile, 
    clearMessage,
    initializeUserData,
    getUserData
  } = useUpdateProfileStore();

  // Initialize user data when component mounts
  useEffect(() => {
    if (user) {
      initializeUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updatePayload = {
        firstname: updatedData.firstname,
        lastname: updatedData.lastname,
        phone: updatedData.phone,
        address: updatedData.address
      };
      
      const result = await updateProfile(updatePayload);
      
      if (result.success && setUser) {
        // Update local user state with new data
        await setUser({ 
          ...user, 
          ...updatePayload 
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const containerStyle = darkMode
    ? { backgroundColor: DARK_THEME_BACKGROUND }
    : { backgroundColor: Back_Ground };

  // Get the current user data from the store
  const currentUserData = getUserData() || user;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInputProfile
          showEditIcon={showEditIcon}
          showButton={true}
          firstname={currentUserData?.firstname || ""}
          lastname={currentUserData?.lastname || ""}
          phone={currentUserData?.phone || ""}
          address={currentUserData?.address || ""}
          onSave={handleUpdateProfile}
          isUpdating={isUpdating}
        />
        {message && (
          <Text style={[styles.message, { color: isSuccess ? "green" : "red" }]}>
            {message}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    padding: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
});

export default UpdateProfileScreen;
