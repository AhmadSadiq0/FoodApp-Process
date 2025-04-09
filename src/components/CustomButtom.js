import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View, ActivityIndicator } from "react-native";
//colors
import { THEME_COLOR, WHITE_COLOR } from "../res/colors";
import { HEART_ICON } from "../res/drawables";

const CustomButton = (props) => {
  const { title, onPress, style, textStyle,  loading = false ,  image } = props;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled = {loading}>
      <View style={styles.buttonContent}>
        {loading && <ActivityIndicator size="small" color={WHITE_COLOR}  style={styles.activityIndicator}/>}
        {image && <Image source={HEART_ICON} style={styles.icon} />}
        <Text style={[styles.buttonText, textStyle]}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME_COLOR,
    padding: 8,
    borderRadius: 37.5,
    marginVertical: 10,
    borderColor: THEME_COLOR,
    borderWidth: 2,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontStyle : "italic",
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator : {
    marginRight : 4
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: WHITE_COLOR
  },
});
export default CustomButton;