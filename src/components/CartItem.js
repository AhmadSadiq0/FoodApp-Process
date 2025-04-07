import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DELETE_ICON, BURGERIMG } from '../res/drawables';
import { WHITE_COLOR, THEME_COLOR, GRAY_COLOR, BLACK_COLOR } from '../res/colors';
import useThemeStore from '../../zustand/ThemeStore';

const CartItem = ({ item, onPressItem, onDeleteItem }) => {
  const { darkMode } = useThemeStore();

  return (
    <View style={[
      styles.cartItem, 
      item.active && { borderColor: THEME_COLOR },
      darkMode && styles.cartItemDark
    ]}>
      <Image 
        source={item.image ? { uri: item.image } : BURGERIMG} 
        style={styles.cartItemImage} 
        resizeMode="contain"
      />
      <View style={styles.cartItemDetails}>
        <Text style={[styles.cartItemName, darkMode && styles.cartItemNameDark]}>{item.name}</Text>
        <Text style={[styles.cartServing, darkMode && styles.cartItemNameDark]}>{item.serving}</Text>
        <Text style={[styles.cartItemPrice, darkMode && styles.cartItemNameDark]}>Rs. {item.price}/-</Text>
      </View>
      <View style={styles.cartItemActions}>
        <ToggleButton active={item.active} onPress={() => onPressItem(item.id)} />
        <DeleteButton onPress={() => onDeleteItem(item.id)} />
      </View>
    </View>
  );
};

const ToggleButton = ({ active, onPress }) => (
  <TouchableOpacity 
    style={[styles.circleBorder, active && { borderColor: THEME_COLOR }]} 
    onPress={onPress}
  >
    <View style={[styles.circle, active && { backgroundColor: GRAY_COLOR, borderRadius: 10 }]} />
  </TouchableOpacity>
);

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={styles.deleteIcon} source={DELETE_ICON} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 12,
    borderColor: WHITE_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    shadowColor: GRAY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartItemDark: {
    backgroundColor: BLACK_COLOR,
    borderColor: WHITE_COLOR,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME_COLOR,
  },
  cartItemNameDark: {
    color: WHITE_COLOR,
  },
  cartItemPrice: {
    fontSize: 12,
    color: THEME_COLOR,
    marginTop: 4,
  },
  cartServing: {
    fontSize: 12,
    color: THEME_COLOR,
    marginTop: 4,
  },
  cartItemActions: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteIcon: {
    height: 25,
    width: 25,
  },
  circleBorder: {
    borderWidth: 2,
    borderColor: THEME_COLOR,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME_COLOR,
  },
});

export default CartItem;