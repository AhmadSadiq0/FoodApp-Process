import React from "react";
import { View, Text, StyleSheet } from "react-native";
//CustomButton
import CustomButton from "./CustomButtom";
//Colors
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
} from "../res/colors";

const ConfirmOrderSummary = (props) => {
  const { onButtonPressed, selectedOrder } = props;

  return (
    <View style={styles.container}>
      {selectedOrder ? (
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
              title="Confirm Order"
              textStyle={{ color: WHITE_COLOR }}
              onPress={onButtonPressed}
            />
          </View>
        </View>
      ) : (
        <Text>No payment method selected.</Text>
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
    paddingTop:30,
    paddingHorizontal:16,
    borderColor: THEME_COLOR,
    backgroundColor: WHITE_COLOR,
  },
  row: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize:24,
    lineHeight:25,
    color: THEME_TEXT_COLOR,
  },
  value: {
    fontSize:24,
    lineHeight:25,
    fontWeight: 'bold',
    color: THEME_COLOR,
  },
  margin: {
    paddingTop:60,
  },
});

export default ConfirmOrderSummary;