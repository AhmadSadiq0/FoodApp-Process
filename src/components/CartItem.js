import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DELETE_ICON, BURGERIMG } from '../res/drawables';
import { WHITE_COLOR, THEME_COLOR, GRAY_COLOR, BLACK_COLOR, THEME_TEXT_COLOR } from '../res/colors';
import useThemeStore from '../../zustand/ThemeStore';

const CartItem = ({ item, onIncrease, onDecrease, onDeleteItem, onPressItem }) => {
  const { darkMode } = useThemeStore();

  return (
    <TouchableOpacity
      // onPress={() => onPressItem(item.id)}
      style={[
        styles.container,
        { backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : WHITE_COLOR }
      ]}
      activeOpacity={0.8}
    >
      <Image
        source={item.image ? { uri: item.image } : BURGERIMG}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.details}>
        <Text style={[styles.name, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
          {item.name}
        </Text>
        <Text style={[styles.type, { color: darkMode ? GRAY_COLOR : '#666' }]}>
          {item.serving}
        </Text>
        <Text style={[styles.price, { color: THEME_COLOR }]}>
          Rs.{parseInt(item.price)}
        </Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          style={[
            styles.qtyButton,
            { backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }
          ]}
          onPress={onDecrease}
          disabled={item.quantity <= 1}
        >
          <Text style={[
            styles.qtyText,
            {
              color: item.quantity <= 1
                ? GRAY_COLOR
                : (darkMode ? WHITE_COLOR : BLACK_COLOR)
            }
          ]}>−</Text>
        </TouchableOpacity>
        <Text style={[styles.qtyCount, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          style={[
            styles.qtyButton,
            { backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }
          ]}
          onPress={onIncrease}
        >
          <Text style={[styles.qtyText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
            ＋
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteItem(item.id)}
      >
        <Image
          style={styles.deleteIcon}
          source={DELETE_ICON}
          tintColor={THEME_COLOR}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor : THEME_COLOR,
    position: 'relative',
    flexWrap: 'wrap',
  },
  image: {
    width: 94,
    height: 94,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  type: {
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  quantityControl: {
    paddingTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 8,
  },
  qtyButton: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
});

export default CartItem;
