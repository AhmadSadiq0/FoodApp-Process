import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  DARK_GRAY,
  LIGHT_GRAY
} from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const PaymentComponent = ({ 
  paymentMethods, 
  onSelectPayment, 
  selectedMethod,
  themeColor = THEME_COLOR,
  darkMode = false
}) => {
  const { darkMode: systemDarkMode } = useThemeStore();
  const finalDarkMode = darkMode || systemDarkMode;

  const paymentIcons = {
    'Cash': 'cash',
    'Debit Card': 'card',
    'App Wallet': 'wallet',
    'Online Payment': 'globe'
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.option,
        finalDarkMode && styles.optionDark,
        selectedMethod?.name === item.name && styles.selectedOption
      ]}
      onPress={() => onSelectPayment(item)}
    >
      <View style={styles.optionContent}>
        <Ionicons 
          name={paymentIcons[item.name]} 
          size={24} 
          color={selectedMethod?.name === item.name ? WHITE_COLOR : themeColor} 
        />
        <View style={styles.textContainer}>
          <Text style={[
            styles.optionText,
            finalDarkMode && styles.optionTextDark,
            selectedMethod?.name === item.name && styles.selectedText
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.optionSubtext,
            finalDarkMode && styles.optionSubtextDark,
            selectedMethod?.name === item.name && styles.selectedSubtext
          ]}>
            {item.description || 'No additional fees'}
          </Text>
        </View>
      </View>
      
      <View style={[
        styles.radioButton,
        selectedMethod?.name === item.name && styles.radioButtonSelected,
        { borderColor: themeColor }
      ]}>
        {selectedMethod?.name === item.name && (
          <Ionicons name="checkmark" size={14} color={WHITE_COLOR} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, finalDarkMode && styles.containerDark]}>
      <Text style={[styles.title, finalDarkMode && styles.titleDark]}>
        Select Payment Method
      </Text>
      <FlatList
        data={paymentMethods}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  containerDark: {
    backgroundColor: DARK_GRAY,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_TEXT_COLOR,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  titleDark: {
    color: WHITE_COLOR,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  option: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionDark: {
    backgroundColor: BLACK_COLOR,
    shadowColor: '#444',
  },
  selectedOption: {
    backgroundColor: THEME_COLOR,
    shadowColor: THEME_COLOR,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME_TEXT_COLOR,
  },
  optionTextDark: {
    color: WHITE_COLOR,
  },
  selectedText: {
    color: WHITE_COLOR,
    fontWeight: '600',
  },
  optionSubtext: {
    fontSize: 14,
    color: GRAY_COLOR,
    marginTop: 4,
  },
  optionSubtextDark: {
    color: LIGHT_GRAY,
  },
  selectedSubtext: {
    color: WHITE_COLOR,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: THEME_COLOR,
    borderColor: THEME_COLOR,
  },
});

export default PaymentComponent;