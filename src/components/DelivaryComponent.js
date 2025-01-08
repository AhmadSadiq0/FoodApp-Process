import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { IMAGE28 } from "../res/drawables";
import { WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, Back_Ground, Black_Color } from "../res/colors";

const DeliveryComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("32215 Maplewood Avenue Pine Hills District.");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.deliverTo}>Deliver To</Text>
        <View style={styles.addressContainer}>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTitle}>My Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.addressInput}
                value={address}
                onChangeText={setAddress}
                multiline
              />
            ) : (
              <Text style={styles.addressDetails}>{address}</Text>
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
  scrollContainer: {
    padding: 16, 
  },
  deliverTo: {
    marginBottom: 16,
    color: THEME_COLOR,
    fontWeight: "bold",
    fontSize: 18,
  },
  addressContainer: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
  elevation: 3, 
      shadowColor: Black_Color, 
      shadowOffset: {
          width: 0, 
          height: 2, 
      },
      shadowOpacity: 0.25, 
      shadowRadius: 3.5, 
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
  addressDetails: {
    color: THEME_TEXT_COLOR,
    marginTop: 4,
  },
  addressInput: {
    color: THEME_TEXT_COLOR,
    marginTop: 4,
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  image: {
    width: 28,
    height: 28,
    marginLeft: 12,
  },
});

export default DeliveryComponent;
