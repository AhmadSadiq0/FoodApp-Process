import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BURGERIMG } from "../res/drawables";
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from "../res/colors";

const AddCard = (props) => {
  const { name, description, image, price, buttonText, onAddToCart } = props;
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Total Price :</Text>
        <Text style={styles.price}>{`Rs. ${price}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    backgroundColor: WHITE_COLOR,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 24,
    color: THEME_COLOR,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 10,
  },
  image: {
    width: 148,
    height: 148,
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
    fontSize: 24,
    fontWeight: "700",
    color: THEME_TEXT_COLOR,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME_COLOR,
  },
  button: {
    width: "100%",
    height: 54,
    justifyContent: "center",
    backgroundColor: THEME_COLOR,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 24,
    fontWeight: "700",
  },
});

export default AddCard;
