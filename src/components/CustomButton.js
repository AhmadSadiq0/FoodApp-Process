import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { GRAY_COLOR, THEME_COLOR } from "../res/colors";
const CustomButton = (props) => {
  const {
    title = "Sign Up",
    backgroundColor = THEME_COLOR,
    style = {},
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }, { ...style }]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: GRAY_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
export default CustomButton;
