import React from "react";
import { View, Text, StyleSheet } from "react-native";
//CustomButton
import CustomButton from "./CustomButtom";
//Colors
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
} from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const ConfirmOrderSummary = (props) => {
  const { onButtonPressed, selectedOrder } = props;
  const { darkMode } = useThemeStore();

  return (
    <View style={styles.container}>
      {selectedOrder ? (
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDark]}>Selected Item(s):</Text>
            <Text style={[styles.value, darkMode && styles.valueDark]}>1</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDark]}>Sub Total:</Text>
            <Text style={[styles.value, darkMode && styles.valueDark]}>Rs. 599</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, darkMode && styles.labelDark]}>Delivery Charges:</Text>
            <Text style={[styles.value, darkMode && styles.valueDark]}>Rs. 0.00</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={[styles.label, darkMode && styles.labelDark]}>Total:</Text>
            <Text style={[styles.value, darkMode && styles.valueDark]}>Rs. 599</Text>
          </View>
          <View style={styles.margin}>
            <CustomButton
              title="Confirm Order"
              textStyle={{ color: WHITE_COLOR }}
              onPress={onButtonPressed}
            />
          </View>
        </View>
      ) : (
        <Text style={[styles.noPaymentText, darkMode && styles.noPaymentTextDark]}>No payment method selected.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 16,
    borderColor: THEME_COLOR,
    backgroundColor: WHITE_COLOR,
  },
  cardDark: {
    backgroundColor: BLACK_COLOR,
  },
  row: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 25,
    color: THEME_TEXT_COLOR,
  },
  labelDark: {
    color: WHITE_COLOR,
  },
  value: {
    fontSize: 24,
    lineHeight: 25,
    fontWeight: 'bold',
    color: THEME_COLOR,
  },
  valueDark: {
    color: WHITE_COLOR,
  },
  margin: {
    paddingTop: 60,
  },
  noPaymentText: {
    fontSize: 16,
    color: THEME_COLOR,
  },
  noPaymentTextDark: {
    color: WHITE_COLOR,
  },
});

export default ConfirmOrderSummary;
