import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  const {
    name = "",
    description = "",
    image,
    variants = [], 
    buttonText = "Add To Cart",
    onAddToCart,
  } = props;
  const { darkMode } = useThemeStore();
  const [selectedSize, setSelectedSize] = useState(variants[0]?.size || "Small");
  const [quantity, setQuantity] = useState(1); 

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const getAdjustedPrice = () => {
    const selectedVariant = variants.find((variant) => variant.name === selectedSize);
    return selectedVariant ? selectedVariant.price * quantity : 0; 
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
      <Image source={image ? { uri: image } : BURGERIMG} style={styles.image} />

      {/* Render size buttons only if `variants` is an array and has items */}
      {Array.isArray(variants) && variants.length > 0 ? (
        <View style={styles.sizeContainer}>
          {variants.map((variant) => (
            <TouchableOpacity
              key={variant.size}
              style={{
                ...styles.sizeButton,
                backgroundColor:
                  selectedSize === variant.name ? THEME_COLOR : GRAY_COLOR,
              }}
              onPress={() => handleSizeSelection(variant.name)}
            >
              <Text
                style={{
                  ...styles.sizeButtonText,
                  color: selectedSize === variant.name ? WHITE_COLOR : BLACK_COLOR,
                }}
              >
                {variant.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>
          No variants available
        </Text>
      )}

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
      <Text
          style={{
            ...styles.priceLabel,
            color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
          }}
        >
          Add Raita :
        </Text>
        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
          
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Price Display */}
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
          {`Rs. ${getAdjustedPrice()}`}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <CustomButton
        title={buttonText}
        style={{
          ...styles.buttonText,
          color: darkMode ? WHITE_COLOR : BLACK_COLOR,
        }}
        onPress={() =>
          onAddToCart({
            id: Math.random().toString(),
            name,
            description,
            image,
            price: getAdjustedPrice(),
            size: selectedSize,
            quantity, 
          })
        }
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
    fontSize: 24,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 8,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: "50%",
    backgroundColor: THEME_COLOR,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: WHITE_COLOR,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 16,
    color: BLACK_COLOR,
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