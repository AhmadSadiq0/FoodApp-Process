// UpdateProfileScreen.js
import React, { useEffect , useState} from "react";
import { View, ScrollView, StyleSheet, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { TextInputProfile } from "../../components";
import { Back_Ground, BLACK_COLOR, DARK_THEME_BACKGROUND } from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import useAuthStore from "../../store/AuthStore";
import useUpdateProfileStore from "../../store/UpdateProfileStore";

const UpdateProfileScreen = (props) => {
  const { user, setUser } = useAuthStore();
  const [isSavedSuccesssfully , setIsSavedSuccessfully ] = useState(false);
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

  useEffect(() => {
    if (user) {
      initializeUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 1500);
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
        await setUser({ 
          ...user, 
          ...updatePayload 
        });
        setIsSavedSuccessfully(true)
        setTimeout(() => {
          setIsSavedSuccessfully(false)
        },2000)
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const containerStyle = darkMode
    ? { backgroundColor: BLACK_COLOR }
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
          user = {user}
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
