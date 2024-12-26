import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from "../res/colors";
const ConfirmOrderSummary = ({ onButtonPressed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Selected Item(s):</Text>
          <Text style={styles.value}>1</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sub Total:</Text>
          <Text style={styles.value}>Rs. 599</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Delivery Charges:</Text>
          <Text style={styles.value}>Rs. 0.00</Text>
        </View>

        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>Rs. 599</Text>
        </View>
        <View style={styles.margin}>
          <CustomButton
            title="ConfirmOrder"
            backgroundColor="#EF4444"
            textColor="#FFFFFF"
            onPress={onButtonPressed}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: GRAY_COLOR,
  },
  card: {
    width: 320,
    padding: 16,
    borderColor: THEME_COLOR,
    borderRadius: 8,
    backgroundColor: WHITE_COLOR,
  },
  row: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    height: 23,
    width: 194,
    fontWeight: "600",
    color: THEME_TEXT_COLOR,
  },
  value: {
    height: 23,
    width: 89,
    fontWeight: "700",
    color: THEME_COLOR,
  },
  margin: {
    marginTop: 9,
  },
});

export default ConfirmOrderSummary;
