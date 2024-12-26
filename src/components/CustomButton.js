import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, backgroundColor = '#F63440', textColor = '#FFF', style ,navigation}) => {
  return (
    <TouchableOpacity
    onPress={() => {navigation.navigate("ConfirmOrder")}}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
