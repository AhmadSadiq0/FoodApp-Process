import React from "react";
import { THEME_COLOR , WHITE_COLOR} from "../res/colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
const CustomButton = (props) => {
  const { title, onPress, backgroundColor, borderColor , style, textStyle , }=props;
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 37.5,
    marginVertical: 5,
    borderColor:THEME_COLOR,
    borderWidth:2,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default CustomButton;
