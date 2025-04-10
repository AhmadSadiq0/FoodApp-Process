import React from "react";
import { View, ActivityIndicator , StyleSheet } from "react-native";
import { THEME_COLOR } from "../res/colors";


const CustomLoadingIndicator = ({ height = 100 }) => (
  <View style={[styles.centerContainer, { height }]}>
    <ActivityIndicator size="large" color={THEME_COLOR} />
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomLoadingIndicator;