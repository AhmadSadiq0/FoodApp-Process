// UpdateProfileScreen.js
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

  const handleUpdateProfile = async (updatedData) => {
    setIsUpdating(true);
    try {
      console.log('Updating profile with new data:', updatedData);
      const result = await updateUserDataService({
        ...updatedData,
        username: user.username,
        role: user.role,
      });

      if (setUser && result?.data) {
        console.log('Profile updated successfully:', result.data);
        await setUser(result.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Silently handle errors or consider logging to external service
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
          email={user?.email || ""}
          phoneNo={user?.phone || ""}
          address={user?.address || ""}
          onSave={handleUpdateProfile}
          isUpdating={isUpdating}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default UpdateProfileScreen;
