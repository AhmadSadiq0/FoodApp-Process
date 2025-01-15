import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
//component
import {ProfileHeader,TextInputProfile} from "../../components";
//colors
import { Back_Ground, DARK_THEME_BACKGROUND } from "../../res/colors";
//Global State
import useThemeStore from "../../../zustand/ThemeStore"; 

const UpdateProfileScreen = (props) => {
  const { navigation, route } = props;
  const { darkMode } = useThemeStore(); 

  const showEditIcon = route?.params?.showEditIcon || true;


  const containerStyle = darkMode ? { backgroundColor: DARK_THEME_BACKGROUND } : { backgroundColor: Back_Ground };

  return (
    <View style={[styles.container, containerStyle]}>
      <ProfileHeader
        navigation={navigation}
        showDotsIcon={false}
        showArrowIcon={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInputProfile showEditIcon={showEditIcon} showButton={true} />
      </ScrollView>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
