import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
//images
import { DELETE_ICON } from '../res/drawables';  
//colors
import { WHITE_COLOR, THEME_COLOR, GRAY_COLOR, Back_Ground } from '../res/colors';  

const CartItem = ({ item, onPressItem, onDeleteItem }) => (
  <View style={[styles.cartItem, item.active && { borderColor: THEME_COLOR }]}>
    <Image style={styles.cartItemImage} source={item.image} />
    <View style={styles.cartItemDetails}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartServing}>{item.serving}</Text>
      <Text style={styles.cartItemPrice}>Rs. {item.price}/-</Text>
    </View>
    <View style={styles.cartItemActions}>
      <ToggleButton active={item.active} onPress={() =>[ onPressItem(item.id), console.log(item.id)]} />
      <DeleteButton onPress={() => onDeleteItem(item.id)} />
    </View>
  </View>
);

const ToggleButton = ({ active, onPress }) => (
  <TouchableOpacity style={styles.circleBorder} onPress={onPress} accessibilityLabel="Toggle item">
    <View style={[styles.circle, active && { backgroundColor: THEME_COLOR }]} />
  </TouchableOpacity>
);

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} accessibilityLabel="Delete item">
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
    backgroundColor: GRAY_COLOR,
  },
});

export default CartItem;
