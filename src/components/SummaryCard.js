import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Colors
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from '../res/colors';
import useThemeStore from '../../zustand/ThemeStore';
//CustomButton
import CustomButton from './CustomButtom';

const SummaryCard = ({ selectedItems, subtotal, onCheckout }) => {
  const { darkMode } = useThemeStore();

  return (
    <View style={[styles.summaryCard, darkMode && styles.summaryCardDark]}>
      <View style={styles.cardTextContainer}>
        <Text style={[styles.summaryText, darkMode && styles.summaryTextDark]}>
          Selected Item(s): <Text style={styles.highlightText}>{selectedItems.length}</Text>
        </Text>
      </View>
      <Text style={[styles.summaryText, darkMode && styles.summaryTextDark]}>
        Sub Total: <Text style={styles.highlightText}>Rs. {subtotal}</Text>
      </Text>
      <View style={styles.customButton}>
        <CustomButton title={'CheckOut'} textStyle={{ color: WHITE_COLOR }} onPress={onCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  summaryCardDark: {
    backgroundColor: 'black',
  },
  summaryText: {
    fontSize: 24,
    color: THEME_TEXT_COLOR,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryTextDark: {
    color: 'white',
  },
  highlightText: {
    fontSize: 24,
    color: THEME_COLOR,
    fontWeight: 'bold',
  },
  customButton: {
    marginTop: 80,
    marginBottom: 30,
    width: '100%',
  },
});

export default SummaryCard;
