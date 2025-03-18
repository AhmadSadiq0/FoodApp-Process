import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
//colors
import { THEME_COLOR, WHITE_COLOR } from "../res/colors";
import { HEART_ICON } from "../res/drawables";

const CustomButton = (props) => {
  const { title, onPress, backgroundColor, borderColor, style, textStyle, image } = props;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.buttonContent}>
        {image && <Image source={HEART_ICON} style={styles.icon} />}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLOR,
    padding: 8,
    borderRadius: 37.5,
    marginVertical: 5,
    borderColor: THEME_COLOR,
    borderWidth: 2,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: WHITE_COLOR,
    fontWeight: "500",
    fontSize: 22,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: WHITE_COLOR
  },
});
export default CustomButton;