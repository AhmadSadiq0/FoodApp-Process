import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME_COLOR, WHITE_COLOR, BLACK_COLOR, LIGHT_GRAY, GRAY_COLOR, DARK_THEME_BACKGROUND } from '../res/colors';

const ToppingItem = ({ topping, isSelected, darkMode, onToggle, fullWidth }) => (
  <TouchableOpacity
    style={[
      styles.toppingItem,
      isSelected && styles.toppingItemSelected,
      fullWidth && styles.fullWidthTopping,
      {
        backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
        borderColor: isSelected ? THEME_COLOR : (darkMode ? GRAY_COLOR : LIGHT_GRAY),
      }
    ]}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <View style={styles.toppingTextContainer}>
      <Text style={[
        styles.toppingName,
        { color: isSelected ? THEME_COLOR : (darkMode ? WHITE_COLOR : BLACK_COLOR) }
      ]}>
        {topping.name}
      </Text>
      <Text style={[
        styles.toppingPrice,
        { color: isSelected ? THEME_COLOR : (darkMode ? GRAY_COLOR : '#666') }
      ]}>
        + Rs. {topping.price}
      </Text>
    </View>
    <View style={[
      styles.toppingCheckbox,
      isSelected && styles.toppingCheckboxSelected,
      { borderColor: isSelected ? THEME_COLOR : (darkMode ? GRAY_COLOR : LIGHT_GRAY) }
    ]}>
      {isSelected && (
        <MaterialIcons name="check" size={16} color={WHITE_COLOR} />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  toppingItem: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fullWidthTopping: {
    width: '100%',
    marginVertical: 7,
    marginHorizontal: 0,
  },
  toppingItemSelected: {
    borderColor: THEME_COLOR,
  },
  toppingTextContainer: {
    flex: 1,
  },
  toppingName: {
    fontSize: 14,
    fontWeight: '500',
  },
  toppingPrice: {
    fontSize: 12,
    marginTop: 2,
  },
  toppingCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  toppingCheckboxSelected: {
    backgroundColor: THEME_COLOR,
    borderColor: THEME_COLOR,
  },
});

export default ToppingItem;