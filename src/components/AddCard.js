import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BURGERIMG } from "../res/drawables";
import { THEME_COLOR,
    THEME_TEXT_COLOR,
    GRAY_COLOR,
    BLACK_COLOR,
    WHITE_COLOR, } from "../res/colors";
const AddCard = ({
  name,
  description,
  image,
  price,
  onAddToCart,
  buttonText = "Add to Cart",
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>      
      <Image source={BURGERIMG} style={styles.image} />
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Total Price :</Text>
        <Text style={styles.price}>{`Rs. ${price}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    card: {
      width: 200,
      padding: 10,
      borderRadius: 12,
      backgroundColor: WHITE_COLOR, // Theme color
      shadowColor: BLACK_COLOR, // Theme color
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
      alignItems: "center",
      margin: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: THEME_TEXT_COLOR, // Theme color
      textAlign: "center",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: THEME_COLOR, // Theme color
      textAlign: "center",
      marginBottom: 10,
    },
    image: {
      width: 120,
      height: 80,
      resizeMode: "contain",
      marginVertical: 8,
    },
    priceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
      marginBottom: 12,
    },
    priceLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: GRAY_COLOR, // Theme color
    },
    price: {
      fontSize: 16,
      fontWeight: "bold",
      color: THEME_COLOR, // Theme color
    },
    button: {
      width: "90%",
      paddingVertical: 10,
      backgroundColor: THEME_COLOR, // Theme color
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: WHITE_COLOR, // Theme color
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  
  export default AddCard;