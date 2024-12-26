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
import CustomButton from '../../components/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';

const { width: deviceWidth } = Dimensions.get('window');

const CartScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Double Cheese Burger', price: 599, serving: 'Single Serving', image: BURGERIMG, active: false },
    { id: 2, name: 'Cheese Burger', price: 449, serving: 'Single Serving', image: BURGERIMG, active: false },
    { id: 3, name: 'Biryani', price: 599, serving: 'Single Serving', image: BURGERIMG, active: false },
  ]);
  const refRBSheet = useRef(null);

  // Function to handle item selection/deselection
  const handlePressItem = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setCartItems(updatedItems);

    // Open or close the RBSheet based on active items
    const hasActiveItems = updatedItems.some((item) => item.active);
    if (hasActiveItems) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  };

  // Function to handle item deletion
  const handleDeleteItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    // If no active items are left, close the bottom sheet
    const hasActiveItems = updatedCart.some((item) => item.active);
    if (!hasActiveItems) {
      refRBSheet.current?.close();
    } else {
      refRBSheet.current?.open();  // Reopen the bottom sheet if there are active items left
    }
  };

  const calculateSubtotal = () => {
    return cartItems.filter((item) => item.active).reduce((total, item) => total + item.price, 0);
  };

  const selectedItems = cartItems.filter((item) => item.active);

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
      {cartItems.map((item) => (
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
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {selectedItems.length > 0 && (
          <View style={styles.summaryCard}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.summaryText}>
                Selected Item(s): <Text style={styles.highlightText}>{selectedItems.length}</Text>
              </Text>
            </View>
            <Text style={styles.summaryText}>
              Sub Total: <Text style={styles.highlightText}>Rs. {calculateSubtotal()}</Text>
            </Text>
            <View style={styles.customButton}>
              <CustomButton title={'CheckOut'} />
            </View>
          </View>
        )}
      </RBSheet>
    </View>
  );
};

const CartItem = ({ item, onPressItem, onDeleteItem }) => {
  return (
    <TouchableOpacity
      style={[styles.cartItem, item.active && { borderColor: THEME_COLOR }]}
      onPress={() => onPressItem(item.id)}
      accessibilityLabel={`Select ${item.name}`}
    >
      {/* Image Section */}
      <Image style={styles.cartItemImage} source={item.image} />

      {/* Item Details Section */}
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartServing}>{item.serving}</Text>
        <Text style={styles.cartItemPrice}>Rs. {item.price}/-</Text>
      </View>

      {/* Actions Section */}
      <View style={styles.cartItemActions}>
        {/* Circle for active state */}
        <TouchableOpacity
          style={styles.circleBorder}
          onPress={() => onPressItem(item.id)}  // Toggles active state on circle press
          accessibilityLabel={`Toggle ${item.name}`}
        >
          <View
            style={[styles.circle, item.active && { backgroundColor: THEME_COLOR }]}
          />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => onDeleteItem(item.id)}
          accessibilityLabel={`Delete ${item.name}`}
        >
          <Image style={styles.deleteIcon} source={DELETE_ICON} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};


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
    marginTop: 20,
    marginBottom: 30,
  },
});

export default CartScreen;
