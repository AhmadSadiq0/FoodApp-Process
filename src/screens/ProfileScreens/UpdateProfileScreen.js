// UpdateProfileScreen.js
import React, { useState,useEffect } from "react";
import { View, ScrollView, StyleSheet,Text } from "react-native";
import { TextInputProfile } from "../../components";
import { Back_Ground, DARK_THEME_BACKGROUND } from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import useAuthStore from "../../store/AuthStore";
import { updateUserDataService } from "../../services/ProfileUpdateService";

const UpdateProfileScreen = (props) => {
  const { user, setUser } = useAuthStore();
  const { navigation, route } = props;
  const { darkMode } = useThemeStore();
  const showEditIcon = route?.params?.showEditIcon ?? true;
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState(null); 
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdateProfile = async (updatedData) => {
    setIsUpdating(true);
    setMessage(null);
    try {
      // Only send the fields we want to update
      const updatePayload= {
        firstname: updatedData.firstname,
        lastname: updatedData.lastname,
        phone: updatedData.phone,
         address: updatedData.address
      };
      console.log('Sending update:', updatePayload);
      const result = await updateUserDataService(updatePayload);
  
      if (result.success) {
        console.log('Update successful');
        if (setUser) {
          // Update local user state with new data
          await setUser({ 
            ...user, 
            ...updatePayload 
          });
        }
        setIsSuccess(true);
        setMessage("Profile updated successfully.");
        // Alert.alert('Success', 'Profile updated successfully');
      } else {
        // Alert.alert('Error', result.message);
        setIsSuccess(false);
        setMessage(result.message || "Update failed.");
      }
    } catch (error) {
      console.error('Update failed:', error);
      // Alert.alert('Error', 'Failed to update profile');
      setIsSuccess(false);
      setMessage("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };
  const containerStyle = darkMode
    ? { backgroundColor: DARK_THEME_BACKGROUND }
    : { backgroundColor: Back_Ground };

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
          firstname={user?.firstname || ""}
          lastname={user?.lastname || ""}
          phone={user?.phone || ""}
          address={user?.address || ""}
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
    // flexGrow: 1,
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
