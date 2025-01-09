import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  THEME_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  Back_Ground
} from '../../res/colors';
import { BURGERIMG, DELETE_ICON } from '../../res/drawables';
import CustomButton from "../../components/CustomButtom";
import RBSheet from 'react-native-raw-bottom-sheet';

const { width: deviceWidth } = Dimensions.get('window');

const initialCartItems = [
  { id: 1, name: 'Double Cheese Burger', price: 599, serving: 'Single Serving', image: BURGERIMG, active: false, originalIndex: 0 },
  { id: 2, name: 'Cheese Burger', price: 449, serving: 'Single Serving', image: BURGERIMG, active: false, originalIndex: 1 },
  { id: 3, name: 'Biryani', price: 599, serving: 'Single Serving', image: BURGERIMG, active: false, originalIndex: 2 },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const refRBSheet = useRef(null);

  const updateCartItems = (updatedItems) => {
    const activeItems = updatedItems.filter(item => item.active);
    const inactiveItems = updatedItems.filter(item => !item.active).sort((a, b) => a.originalIndex - b.originalIndex);
    setCartItems([...activeItems, ...inactiveItems]);
    refRBSheet.current?.[activeItems.length > 0 ? 'open' : 'close']();
  };

  const handlePressItem = (id) => {
    const updatedItems = cartItems.map(item => item.id === id ? { ...item, active: !item.active } : item);
    updateCartItems(updatedItems);
  };

  // Function to handle item deletion
  const handleDeleteItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCartItems(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems.filter(item => item.active).reduce((total, item) => total + item.price, 0);
  };

  const selectedItems = cartItems.filter(item => item.active);

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Check Out</Text>
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onPressItem={handlePressItem}
          onDeleteItem={handleDeleteItem}
        />
      ))}
      <RBSheet
        ref={refRBSheet}
        height={300}
        draggable={true}
        customStyles={{
          container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE_COLOR },
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: '#d3d3d3' },
        }}
      >
        {selectedItems.length > 0 && (
          <SummaryCard
            selectedItems={selectedItems}
            subtotal={calculateSubtotal()}
            onCheckout={() => navigation.navigate("ConfirmOrder")}
          />
        )}
      </RBSheet>
    </View>
  );
};

const CartItem = ({ item, onPressItem, onDeleteItem }) => (
  <TouchableOpacity
    style={[styles.cartItem, item.active && { borderColor: THEME_COLOR }]}
    onPress={() => onPressItem(item.id)}
    accessibilityLabel={`Select ${item.name}`}>
    <Image style={styles.cartItemImage} source={item.image} />
    <View style={ styles.cartItemDetails}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartServing}>{item.serving}</Text>
      <Text style={styles.cartItemPrice}>Rs. {item.price}/-</Text>
    </View>
    <View style={styles.cartItemActions}>
      <ToggleButton active={item.active} onPress={() => onPressItem(item.id)} />
      <DeleteButton onPress={() => onDeleteItem(item.id)} />
    </View>
  </TouchableOpacity>
);

const ToggleButton = ({ active, onPress }) => (
  <TouchableOpacity
    style={styles.circleBorder}
    onPress={onPress}
    accessibilityLabel={`Toggle item`}>
    <View style={[styles.circle, active && { backgroundColor: THEME_COLOR }]} />
  </TouchableOpacity>
);

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} accessibilityLabel={`Delete item`}>
    <Image style={styles.deleteIcon} source={DELETE_ICON} />
  </TouchableOpacity>
);

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
      <CustomButton
        title={'CheckOut'}
        textStyle={{ color: WHITE_COLOR }}
        onPress={onCheckout}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Back_Ground,
  },
  headingText: {
    color: THEME_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'right',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 12,
    borderColor: WHITE_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    alignItems: 'center',
    shadowColor: BLACK_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    color: THEME_TEXT_COLOR,
  },
  cartItemPrice: {
    fontSize: 12,
    color: THEME_COLOR,
    marginTop: 4,
  },
  cartServing: {
    fontSize: 12,
    color: THEME_TEXT_COLOR,
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
  summaryCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: deviceWidth,
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
  emptyCartText: {
    fontSize: 18,
    color: GRAY_COLOR,
    textAlign: 'center',
  },
  customButton: {
    marginTop: 80,
    marginBottom: 30,
    width: '100%',
 },
});

export default CartScreen;