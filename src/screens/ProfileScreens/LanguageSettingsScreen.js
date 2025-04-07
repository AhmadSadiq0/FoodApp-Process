import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from "react-native";
// CustomButton
import { CustomButton } from "../../components";
// Icon
import { Language_Icon } from "../../res/drawables";
// Colors
import {
  Back_Ground,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
  BLACK_COLOR,
} from "../../res/colors";
// State Manage
import useThemeStore from "../../../zustand/ThemeStore";

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);
  const { darkMode } = useThemeStore();

  const languages = ["English", "Urdu",];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language); 
    setModalVisible(false); 
  };
 
  const dynamicThemeColor = darkMode ? WHITE_COLOR : THEME_COLOR;
  const dynamicIconColor = darkMode ? WHITE_COLOR : THEME_COLOR;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground },
      ]}
    >
      <View style={styles.contentContainer}>
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

        <TouchableOpacity
          style={[
            styles.languageRow,
            {
              backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
            },
          ]}
          onPress={() => setModalVisible(true)} 
        >
          <Text
            style={[
              styles.label,
              { color: dynamicThemeColor },
            ]}
          >
            Select Language
          </Text>
          <Image source={Language_Icon} style={[styles.icon, { tintColor: dynamicIconColor }]} />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <CustomButton
        title={"Save"}
        style={[
          styles.button,
          {
            backgroundColor: THEME_COLOR,
            borderColor:THEME_COLOR
          },
        ]}
        textStyle={{
          color: darkMode ? WHITE_COLOR : WHITE_COLOR,
        }}
      />

      <Modal
        animationType="slide"
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Language</Text>
        
            <FlatList
              data={languages} 
              keyExtractor={(item) => item} 
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => handleLanguageSelect(item)} 
                >
                  <Text style={styles.languageText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} 
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container : {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    width: "80%",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  languageItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
  languageText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: THEME_COLOR,
    borderRadius: 5,
  },
  closeButtonText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
  },
});

export default LanguageScreen;