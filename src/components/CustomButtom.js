import React from "react";
import { THEME_COLOR , WHITE_COLOR} from "../res/colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButtom = ({ title, onPress, backgroundColor, borderColor , style, textStyle , }) => {
  return (
    <TouchableOpacity style={[styles.button,  { backgroundColor}, {borderColor}, style]} onPress={onPress}>
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
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default CustomButtom;
