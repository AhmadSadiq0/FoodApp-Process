import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WHITE_COLOR, BLACK_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";
import AddCard from "./AddCard";

const BurgerItem = ({ selectedItem, onAddToCart }) => {
  const { darkMode } = useThemeStore();

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      {selectedItem ? (
        <AddCard
          name={selectedItem.name}
          description="A delicious choice"
          image={selectedItem.image}
          price={selectedItem.price}
          onAddToCart={onAddToCart}
        />
      ) : (
        <Text style={[styles.noItemText, darkMode && styles.noItemTextDark]}>No item selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  noItemText: {
    color: BLACK_COLOR,
  },
  noItemTextDark: {
    color: WHITE_COLOR,
  },
});
export default BurgerItem;
