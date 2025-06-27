import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
//customButton
import { CustomButton } from "../../components";
//State Manage
import useThemeStore from "../../../zustand/ThemeStore";
//colors
import { THEME_COLOR, GRAY_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR, DARK_THEME_TEXT_COLOR, DARK_THEME_BACKGROUND } from "../../res/colors";

const SettingScreen = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [tempDarkMode, setTempDarkMode] = useState(darkMode);

  const handleSave = () => {
    if (tempDarkMode !== darkMode) {
      toggleDarkMode();
    }
  };

  const dynamicThemeColor = darkMode ? WHITE_COLOR : THEME_COLOR;
  const dynamicTextColor = darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR;

  return (
    <View style={[styles.container, { backgroundColor: tempDarkMode ? BLACK_COLOR : Back_Ground }]}>
      <View style={[styles.toggleContainer, { backgroundColor: darkMode ? DARK_THEME_BACKGROUND: WHITE_COLOR }]}>
        <Text style={[styles.label, { color: dynamicTextColor }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: GRAY_COLOR, true: THEME_COLOR }}
          thumbColor={THEME_COLOR}
          ios_backgroundColor={GRAY_COLOR}
          onValueChange={setTempDarkMode}
          value={tempDarkMode}
        />
      </View>
      <CustomButton 
        style={[styles.saveButton, { backgroundColor: THEME_COLOR }]} 
        title="Save" 
        onPress={handleSave} 
        textStyle={{ color: WHITE_COLOR }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  backgroundColor: Back_Ground,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 25,
    width: "100%",
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default SettingScreen;
