// SummaryCard.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Colors
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from '../res/colors';
//CustomButton
import CustomButton from './CustomButtom';

const SummaryCard = ({ selectedItems, subtotal, onCheckout }) => (
  <View style={styles.summaryCard}>
    <View style={styles.cardTextContainer}>
      <Text style={styles.summaryText}>
        Selected Item(s): <Text style={styles.highlightText}>{selectedItems.length}</Text>
      </Text>
    </View>
    <Text style={styles.summaryText}>
      Sub Total: <Text style={styles.highlightText}>Rs. {subtotal}</Text>
    </Text>
    <View style={styles.customButton}>
      <CustomButton title={'CheckOut'} textStyle={{ color: WHITE_COLOR }} onPress={onCheckout} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  summaryCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 24,
    color: THEME_TEXT_COLOR,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
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
