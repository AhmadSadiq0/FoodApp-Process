import React from 'react';
import { StyleSheet, View } from "react-native";
import DealsScreen from "./DealsScreen";
import { burgerData } from "../../data/ScreenData"; 
import { WHITE_COLOR } from '../../res/colors'; 

const DiscountsScreen = () => {
  const data = [
    { id: 1, title: "Discounts", data: burgerData },
    { id: 2, title: "Deals", data: burgerData },
    { id: 3, title: "Loyalty Burgers", data: burgerData },
  ];

  return (
    <View style={styles.container}>
      <DealsScreen data={data} /> 
    </View>
  );
};

export default DiscountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
});
