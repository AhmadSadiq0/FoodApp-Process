import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DELETE_ICON, BURGERIMG } from '../res/drawables';
import { WHITE_COLOR, THEME_COLOR, GRAY_COLOR, BLACK_COLOR } from '../res/colors';
import useThemeStore from '../../zustand/ThemeStore';

const CartItem = ({ item, onIncrease, onDecrease, onDeleteItem }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={item.image ? { uri: item.image } : BURGERIMG} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.serving}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity 
          style={styles.qtyButton} 
          onPress={onDecrease}
          disabled={item.quantity <= 1} // Disable if quantity is 1 or less
        >
          <Text style={[styles.qtyText, item.quantity <= 1 && { color: GRAY_COLOR }]}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyCount}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={onIncrease}>
          <Text style={styles.qtyText}>＋</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDeleteItem(item.id)}
      >
        <Image style={styles.deleteIcon} source={DELETE_ICON} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    backgroundColor: WHITE_COLOR, // Changed from GRAY_COLOR to WHITE_COLOR
    marginBottom: 12,
    shadowColor: GRAY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
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
    color: BLACK_COLOR,
  },
  type: {
    fontSize: 12,
    color: GRAY_COLOR,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    color: BLACK_COLOR,
  },
  quantityControl: {
    paddingTop: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 8,
  },
  qtyButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: BLACK_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyCount: {
    color: BLACK_COLOR,
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
    height: 18,
    width: 18,
    tintColor: THEME_COLOR,
  },
});

export default CartItem;