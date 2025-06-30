import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME_COLOR, WHITE_COLOR, BLACK_COLOR } from '../res/colors';
import { Ionicons } from '@expo/vector-icons';

const OrderTypeSelector = ({ selectedType, onSelect, darkMode }) => {
  const options = [
    { id: 'delivery', icon: 'car', label: 'Delivery' },
    { id: 'dine_in', icon: 'restaurant', label: 'Dine In' },
    { id: 'pickup', icon: 'walk', label: 'Pickup' },
  ];
  const handleSelect = (type) => {
    onSelect(type, type === 'dine_in' || type === 'pickup');
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.title, darkMode && styles.titleDark]}>
        Select Order Type
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedType === option.id && styles.selectedOption,
              darkMode && styles.optionDark,
              selectedType === option.id && darkMode && styles.selectedOptionDark
            ]}
            // onPress={() => onSelect(option.id)}
            onPress={() => handleSelect(option.id)}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={selectedType === option.id ? WHITE_COLOR : THEME_COLOR}
            />
            <Text
              style={[
                styles.optionText,
                selectedType === option.id && styles.selectedOptionText,
                darkMode && styles.optionTextDark,
                selectedType === option.id && darkMode && styles.selectedOptionTextDark
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginTop : 25
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
    shadowColor: '#444',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  titleDark: {
    color: WHITE_COLOR,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    marginHorizontal: 4,
  },
  optionDark: {
    borderColor: '#444',
  },
  selectedOption: {
    backgroundColor: THEME_COLOR,
    borderColor: THEME_COLOR,
  },
  selectedOptionDark: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  optionText: {
    marginTop: 8,
    color: '#555',
    fontWeight: '500',
  },
  optionTextDark: {
    color: '#DDD',
  },
  selectedOptionText: {
    color: WHITE_COLOR,
  },
  selectedOptionTextDark: {
    color: WHITE_COLOR,
  },
});

export default OrderTypeSelector;