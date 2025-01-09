import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CustomButton from "../../components/CustomButtom";
import { Language_Icon } from "../../res/drawables";
import {
  Back_Ground,
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
} from "../../res/colors";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageSelect = () => {
    console.log("Language selection dropdown clicked");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.languageRow}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>{selectedLanguage}</Text>
        </View>

        <TouchableOpacity style={styles.languageRow} onPress={handleLanguageSelect}>
          <Text style={styles.label}>Select Language</Text>
          <Image source={Language_Icon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <CustomButton title={"Save"} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Back_Ground,
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
    backgroundColor: WHITE_COLOR,
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
    color: THEME_COLOR,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: THEME_TEXT_COLOR,
  },
  dropdownIcon: {
    fontSize: 16,
    color: THEME_TEXT_COLOR,
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    backgroundColor: THEME_COLOR,
    height: 50,
  },
});

export default LanguageScreen;
