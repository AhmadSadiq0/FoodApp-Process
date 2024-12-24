import React from "react";
import { THEME_COLOR , WHITE_COLOR} from "../res/colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLOR,
    padding: 15,
    borderRadius: 25,
    marginVertical: 20,
    // width: "100%",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  buttonText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomButton;
