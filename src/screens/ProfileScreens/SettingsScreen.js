import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
//customButton
import { CustomButton } from "../../components";
//State Manage
import useThemeStore from "../../../zustand/ThemeStore";
//colors
import { THEME_COLOR, GRAY_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR } from "../../res/colors";

const SettingScreen = () => {
  const { darkMode, toggleDarkMode } = useThemeStore(); 

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground },
      ]}
    >
      <View style={[styles.toggleContainer, darkMode && styles.toggleContainerDark]}>
        <Text
          style={[
            styles.label,
            { color: darkMode ? WHITE_COLOR : THEME_COLOR },
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: GRAY_COLOR, true: GRAY_COLOR }}
          thumbColor={darkMode ? THEME_COLOR : THEME_TEXT_COLOR}
          ios_backgroundColor={GRAY_COLOR}
          onValueChange={toggleDarkMode}
          value={darkMode}
          style={styles.switch}
        />
      </View>
      <CustomButton title={"Save"} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    elevation: 5,
  },
  toggleContainerDark: {
    backgroundColor: GRAY_COLOR,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    height: 50,
    backgroundColor: THEME_COLOR,
  },
});

export default SettingScreen;
