import React from "react";
import { Text , StyleSheet , View } from "react-native";
import { WHITE_COLOR , BLACK_COLOR } from "../res/colors";

const CustomErrorText = ({ text, darkMode }) => (
  <View style={styles.centerContainer}>
    <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default CustomErrorText;