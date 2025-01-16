import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
//CustomButton
import { CustomButton } from "../../components";
//Icon
import { Language_Icon } from "../../res/drawables";
//Colors
import {
  Back_Ground,
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
  BLACK_COLOR,
} from "../../res/colors";
//State Manage
import useThemeStore from "../../../zustand/ThemeStore";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const { darkMode } = useThemeStore();

  const handleLanguageSelect = () => {
    console.log("Language selection dropdown clicked");
  };

  // Dynamically adjust theme color
  const dynamicThemeColor = darkMode ? WHITE_COLOR : THEME_COLOR;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground },
      ]}
    >
      <View style={styles.contentContainer}>
        {/* Language Row */}
        <View
          style={[
            styles.languageRow,
            {
              backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: dynamicThemeColor },
            ]}
          >
            Language
          </Text>
          <Text
            style={[
              styles.value,
              { color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR },
            ]}
          >
            {selectedLanguage}
          </Text>
        </View>

        {/* Select Language Button */}
        <TouchableOpacity
          style={[
            styles.languageRow,
            {
              backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
            },
          ]}
          onPress={handleLanguageSelect}
        >
          <Text
            style={[
              styles.label,
              { color: dynamicThemeColor },
            ]}
          >
            Select Language
          </Text>
          <Image source={Language_Icon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <CustomButton
        title={"Save"}
        style={[
          styles.button,
          {
            backgroundColor: darkMode ? BLACK_COLOR : THEME_COLOR,
            borderColor: darkMode ? WHITE_COLOR : THEME_COLOR,
          },
        ]}
        textStyle={{
          color: darkMode ? WHITE_COLOR : "black",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    marginBottom: 20,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    height: 50,
  },
});

export default LanguageScreen;
