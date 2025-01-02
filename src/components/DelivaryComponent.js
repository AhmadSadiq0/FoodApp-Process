import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IMAGE28 } from "../res/drawables";
import {  WHITE_COLOR,THEME_COLOR } from "../res/colors"; 
  const DelivaryComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("32215 Maplewood Avenue Pine Hills District.");
  const handleEdit = () => { 
    setIsEditing(true); 
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
  },
  deliverTo: {
    marginLeft: 16,
    color: THEME_COLOR,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  addressContainer: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    width: "95%",
    maxWidth: 330,
  },
  addressTitle: {
    marginLeft: 4,
    color: "#6b21a8",
    fontWeight: "bold",
    fontSize: 18,
  },
  addressDetails: {
    marginLeft: 4,
    color: "#4b5563",
    marginTop: 4,
  },
  addressInput: {
    color: "#4b5563",
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 4,
    padding: 4,
  },
  image: {
    width: 28, 
    height: 28,
    marginLeft: 20,
  },
});
export default DelivaryComponent;