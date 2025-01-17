import React from 'react';
import { StyleSheet, View } from "react-native";
import DealsScreen from "./DealsScreen";
import { burgerData } from "../../data/ScreenData"; 
import { Back_Ground, } from '../../res/colors'; 
import useThemeStore from '../../../zustand/ThemeStore';

const DiscountsScreen = () => {
  const { darkMode } = useThemeStore();

  const data = [
    { id: 1, title: "Discounts", data: burgerData },
    { id: 2, title: "Deals", data: burgerData },
    { id: 3, title: "Loyalty Burgers", data: burgerData },
  ];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground}]}>
      <DealsScreen data={data} />
    </View>
  );
};

export default DiscountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
