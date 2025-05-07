import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
//component
import {TextInputProfile} from "../../components";
//colors
import { Back_Ground, DARK_THEME_BACKGROUND } from "../../res/colors";
//Global State
import useThemeStore from "../../../zustand/ThemeStore"; 
import useAuthStore from "../../store/AuthStore";

const UpdateProfileScreen = (props) => {
  const { user } = useAuthStore(); 
  const { navigation, route } = props;
  const { darkMode } = useThemeStore(); 
  const showEditIcon = route?.params?.showEditIcon || true;

  const containerStyle = darkMode ? { backgroundColor: DARK_THEME_BACKGROUND } : { backgroundColor: Back_Ground };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <ProfileHeader
        navigation={navigation} 
        showDotsIcon={false}
        showArrowIcon={true}
        title={user?.username || "User"}
      /> */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInputProfile 
          showEditIcon={showEditIcon} 
          showButton={true}
          username={user?.username || 'N/A'}
          email={user?.email || ''} 
          phoneNo={user?.phone || 'N/A'} 
          address={user?.address || 'N/A'} 
          debitCardDetail={'N/A'} 
          password={user?.password || 'N/A'}
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
