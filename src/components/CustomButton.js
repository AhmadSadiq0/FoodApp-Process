import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';

const CustomButton = ({ title, onPress, backgroundColor = THEME_COLOR, width = 225, height = 50 , textColor = WHITE_COLOR, style ,navigation}) => {
  return (
    <TouchableOpacity
    onPress={() => {navigation.navigate("ConfirmOrder")}}
      style={[styles.button, { backgroundColor }, {width} , {height} ,style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
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
