import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BURGERIMG } from "../res/drawables";
import { 
  THEME_COLOR, 
  THEME_TEXT_COLOR, 
  WHITE_COLOR 
} from "../res/colors";

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
    width: '100%',
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: WHITE_COLOR,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: THEME_COLOR,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginVertical: 15,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME_COLOR,
  },
  button: {
    width: "95%",
    paddingVertical: 12,
    backgroundColor: THEME_COLOR,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCard;
