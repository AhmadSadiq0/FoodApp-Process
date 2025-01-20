import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
//images
import { BURGERIMG } from "../res/drawables";
//colors
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from "../res/colors";
import CustomButton from "./CustomButtom";
import useThemeStore from "../../zustand/ThemeStore";

const AddCard = (props) => {
  const { name, description, image, price, buttonText, onAddToCart } = props;
  const { darkMode } = useThemeStore();

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
      }}
    >
      <Text
        style={{
          ...styles.name,
          color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
        }}
        numberOfLines={name.length > 16 ? 2 : 1}
      >
        {name}
      </Text>
      <Text
        style={{
          ...styles.description,
          color: darkMode ? THEME_COLOR : THEME_COLOR,
        }}
      >
        {description}
      </Text>
      <Image source={image} style={styles.image} />
      <View style={styles.priceContainer}>
        <Text
          style={{
            ...styles.priceLabel,
            color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
          }}
        >
          Total Price :
        </Text>
        <Text
          style={{
            ...styles.price,
            color: darkMode ? THEME_COLOR : THEME_COLOR,
          }}
        >
          {`Rs. ${price}`}
        </Text>
      </View>
      <CustomButton
        title={buttonText || "Add To Cart"}
        style={{
          ...styles.buttonText,
          color: darkMode ? WHITE_COLOR : BLACK_COLOR,
        }}
        onPress={onAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 24,
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
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 100,
  },
});

export default AddCard;
