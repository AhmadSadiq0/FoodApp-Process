import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BURGERIMG } from "../res/drawables";
import { THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR, } from "../res/colors";
const BurgerCard = (props) => {
  const { name, price, image, onAdd,navigation } = props;

  return (
    <View style={styles.card}>
       <Text style={styles.name}>{name}</Text>
      <Image source={BURGERIMG} style={styles.image} />
      <Text style={styles.price}>{`Rs. ${price}/-`}</Text>
      <Text style={styles.serving}>Single Serving</Text>
      <View style={styles.addmargin}>
        <TouchableOpacity style={styles.addButton}
        onPress={() => {
          onAdd();
          // navigation.navigate("Cart", { name, price, image });
        }}
      >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 230,
    padding:3,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR, 
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    margin: 7,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginVertical: 18,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
   marginTop:5,
   color: THEME_TEXT_COLOR,
  },
  price: {
    fontSize: 15,
    color: THEME_TEXT_COLOR,
    fontWeight:'bold',
    right: 29,
  },
  serving: {
    fontSize: 11,
    color: THEME_TEXT_COLOR,
    right: 29,
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
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: "bold",
  },
  addmargin: { 
    justifyContent: "flex-end",
    alignItems: "flex-end", 
  },
});
export default BurgerCard;