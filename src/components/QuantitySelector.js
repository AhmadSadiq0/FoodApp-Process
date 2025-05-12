// QuantitySelector.js (new component file)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME_COLOR,LIGHT_GRAY,BLACK_COLOR,GRAY_COLOR,WHITE_COLOR } from '../res/colors';
 
const QuantitySelector = ({ 
  quantity, 
  onIncrement, 
  onDecrement, 
  darkMode,
  minQuantity = 1,
  maxQuantity = 99
}) => {
  const isMinReached = quantity <= minQuantity;
  const isMaxReached = quantity >= maxQuantity;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onDecrement}
        disabled={isMinReached}
        style={[
          styles.button,
          styles.leftButton,
          { 
            backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
            borderColor: darkMode ? GRAY_COLOR : THEME_COLOR,
            opacity: isMinReached ? 0.5 : 1
          }
        ]}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="remove" 
          size={20} 
          color={darkMode ? WHITE_COLOR : THEME_COLOR} 
        />
      </TouchableOpacity>
      
      <View style={[
        styles.quantityDisplay,
        { 
          backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
          borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
        }
      ]}>
        <Text style={[
          styles.quantityText, 
          { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
        ]}>
          {quantity}
        </Text>
      </View>
      
      <TouchableOpacity
        onPress={onIncrement}
        disabled={isMaxReached}
        style={[
          styles.button,
          styles.rightButton,
          { 
            backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
            borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
            opacity: isMaxReached ? 0.5 : 1
          }
        ]}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="add" 
          size={20} 
          color={darkMode ? WHITE_COLOR : THEME_COLOR} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  quantityDisplay: {
    width: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuantitySelector;