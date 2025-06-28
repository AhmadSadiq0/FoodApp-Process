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

const BurgerCardHorizantol = (props) => {
  const { name, price, image, onAdd, description } = props
  const { darkMode } = useThemeStore();

  const backgroundColor = darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR;
  const textColor = darkMode ? WHITE_COLOR : BLACK_COLOR;

  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor }]} onPress={onAdd}>
      
      <Image
        source={image ? { uri: image } : BURGERIMG}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: textColor }]}>
          {name?.length > 25 ? name.slice(0, 25) + "..." : name}
        </Text>
        <Text style={[styles.description, { color: textColor }]}>
          {description?.length > 90
            ? description.slice(0, 90) + "..."
            : description}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>Rs. {price}/-</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    backdropFilter: "blur(10px)",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceTag: {
    backgroundColor: "#ffecd2",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  priceText: {
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: THEME_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addBtnText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default BurgerCardHorizantol;
