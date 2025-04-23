import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
//Images
import { IMAGE28 } from "../res/drawables";
//Colors
import { WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const DeliveryComponent = () => {
  const { darkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("32215 Maplewood Avenue Pine Hills District.");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={[styles.screen, darkMode && styles.screenDark]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.deliverTo, darkMode && styles.deliverToDark]}>Deliver To</Text>
        <View style={[styles.addressContainer, darkMode && styles.addressContainerDark]}>
          <View style={styles.addressTextContainer}>
            <Text style={[styles.addressTitle, darkMode && styles.addressTitleDark]}>My Address</Text>
            {isEditing ? (
              <TextInput
                style={[styles.addressInput, darkMode && styles.addressInputDark]}
                value={address}
                onChangeText={setAddress}
                multiline
              />
            ) : (
              <Text style={[styles.addressDetails, darkMode && styles.addressDetailsDark]}>{address}</Text>
            )}
          </View>
          <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
            <Image source={IMAGE28} style={styles.image} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Back_Ground,
  },
  screenDark: {
    backgroundColor: BLACK_COLOR,
  },
  scrollContainer: {
    padding: 16, 
  },
  deliverTo: {
    marginBottom: 16,
    color: THEME_COLOR,
    fontWeight: "bold",
    fontSize: 18,
  },
  deliverToDark: {
    color: WHITE_COLOR,
  },
  addressContainer: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    elevation: 3, 
    shadowColor: BLACK_COLOR, 
    shadowOffset: {
        width: 0, 
        height: 2, 
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.5, 
  },
  addressContainerDark: {
    backgroundColor: BLACK_COLOR,
  },
  addressTextContainer: {
    flex: 1, 
  },
  addressTitle: {
    marginBottom: 8,
    color: THEME_TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 18,
  },
  addressTitleDark: {
    color: WHITE_COLOR,
  },
  addressDetails: {
    color: THEME_TEXT_COLOR,
    marginTop: 4,
  },
  addressDetailsDark: {
    color: WHITE_COLOR,
  },
  addressInput: {
    color: THEME_TEXT_COLOR,
    marginTop: 4,
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  addressInputDark: {
    color: WHITE_COLOR,
    borderColor: WHITE_COLOR,
  },
  image: {
    width: 28,
    height: 28,
    marginLeft: 12,
    tintColor: THEME_COLOR,
  },
});

export default DeliveryComponent;
