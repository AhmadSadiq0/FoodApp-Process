import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WHITE_COLOR, BLACK_COLOR } from "../res/colors";
import AddCard from "./AddCard";
const BurgerItem = ({ selectedItem, onAddToCart }) => {
  return (
    <View style={styles.container}>
      {selectedItem ? (
        <AddCard
          name={selectedItem.name}
          description="A delicious choice!"
          image={selectedItem.image}
          price={selectedItem.price}
          onAddToCart={onAddToCart}
        />
      ) : (
        <Text style={{ color: BLACK_COLOR }}>No item selected</Text>
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
});

export default BurgerItem;
