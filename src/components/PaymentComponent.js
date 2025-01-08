import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import {
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  Black_Color,
} from "../res/colors";

const PaymentComponent = ({ paymentMethods, onSelectPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setSelectedPayment(item.name);
        onSelectPayment(item); 
      }}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.optionText}>{item.name}</Text>
      <View
        style={[
          styles.radioButton,
          selectedPayment === item.name && styles.radioButtonSelected,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.optionContainer}>
        <FlatList
          data={paymentMethods}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    color: THEME_COLOR,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
    marginLeft: 7,
  },
  optionContainer: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: Black_Color, 
    shadowOffset: {
        width: 0, 
        height: 2, 
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.5, 
},
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  image: {
    marginRight: 8,
    height: 18,
    width: 27,
  },
  optionText: {
    fontWeight: "600",
    fontSize: 16,
    color: THEME_TEXT_COLOR,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor:GRAY_COLOR,
    borderColor: THEME_COLOR,
  },
  radioButtonSelected: {
    borderColor: THEME_COLOR,
    backgroundColor: THEME_COLOR,
  },
});

export default PaymentComponent;