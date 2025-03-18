import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
//images
import { BURGERIMG } from "../res/drawables";
//colors
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
  Back_Ground,
} from "../res/colors";
//Store
import useThemeStore from "../../zustand/ThemeStore";

const BurgerCard = (props) => {

  const { darkMode } = useThemeStore();

  const { name, price, image, onAdd , description } = props;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground },
      ]}
    >
      <Text
        style={[
          styles.name,
          { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR },
        ]}
      >
        {name && name.length > 16 ? name.slice(0, 16) + "..." : name}
      </Text>
      <Image source={image ? {uri : image} : BURGERIMG} style={styles.image} />
      <Text
        style={[
          styles.price,
          { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR },
        ]}
      >
        {`Rs. ${price}/-`}
      </Text>
      <Text
        style={[
          styles.serving,
          { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR },
        ]}
        numberOfLines={2}
      >
        {description && description.length > 30 ? description.slice(0, 30) + "..." : description}
      </Text>
      <View style={styles.addmargin}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: THEME_COLOR }]}
          onPress={() => {
            onAdd();
          }}
        >
          <Text
            style={[
              styles.addText,
              { color: darkMode ? BLACK_COLOR : WHITE_COLOR },
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 230,
    padding: 3,
    borderRadius: 10,
    backgroundColor: Back_Ground,
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginVertical: 15,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    //marginRight: 1,
    marginTop: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf : "flex-start",
    left: 5,
  },
  serving: {
    width : '60%',
    fontSize: 11,
    alignSelf : "flex-start",
    left: 5,
  },
  addButton: {
    alignSelf: "flex-end",
    width: 34,
    height: 34,
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    left: 48,
    bottom: 30,
  },
  addText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addmargin: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default BurgerCard;
