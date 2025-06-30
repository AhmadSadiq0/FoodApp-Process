import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BURGERIMG } from "../res/drawables";
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
  Back_Ground,
  DARK_THEME_BACKGROUND,
} from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const { width } = Dimensions.get("window");

const BurgerCard = (props) => {
  const { name, description, price, image, onAdd } = props;
  const { darkMode } = useThemeStore();
  const textColor = darkMode ? WHITE_COLOR : THEME_TEXT_COLOR;
  const cardColor = darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR;

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={(e) => {
        e.stopPropagation(); 
        onAdd();
      }}
      activeOpacity={0.8}
    >
      <Image
        source={image ? { uri: image } : BURGERIMG}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={[styles.name, { color: textColor }]}>
          {name?.length > 18 ? name.slice(0, 18) + "..." : name}
        </Text>

        <Text style={[styles.description, { color: textColor }]}>
          {description?.length > 40
            ? description.slice(0, 40) + "..."
            : description}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.price, { color: THEME_COLOR }]}>
            Rs. {price}/-
          </Text>
          {/* <TouchableOpacity 
            style={styles.addButton} 
            onPress={(e) => {
              e.stopPropagation(); 
              onAdd();
            }}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const CARD_WIDTH = 180;
// const CARD_HEIGHT = 260;

const styles = StyleSheet.create({
  card: {
    left:8,
    width: 180,
    height: 260,
    marginHorizontal: 10,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    borderWidth:2,
   borderColor:"#e0e0e0",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: THEME_COLOR,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: WHITE_COLOR,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BurgerCard;