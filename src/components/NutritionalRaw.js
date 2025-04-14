import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {   THEME_COLOR,
    WHITE_COLOR,
    GRAY_COLOR,
    BLACK_COLOR,
  DARK_GRAY, } from '../res/colors';

const NutritionRow = ({ label, value, darkMode, isLast }) => (
  <View style={[
    styles.nutritionRow,
    !isLast && styles.nutritionRowBorder,
    { borderBottomColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
  ]}>
    <Text style={[styles.nutritionLabel, { color: darkMode ? GRAY_COLOR : DARK_GRAY }]}>
      {label}
    </Text>
    <Text style={[styles.nutritionValue, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  nutritionRowBorder: {
    borderBottomWidth: 1,
  },
  nutritionLabel: {
    fontSize: 14,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NutritionRow;