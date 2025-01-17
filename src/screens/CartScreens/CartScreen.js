import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { CartItem, SummaryCard } from '../../components'; 
import RBSheet from 'react-native-raw-bottom-sheet';
import { initialCartItems } from '../../data/ScreenData';
import { Back_Ground, THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from '../../res/colors';
import useThemeStore from "../../../zustand/ThemeStore";

const { width: deviceWidth } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const refRBSheet = useRef(null);
  const { darkMode, toggleDarkMode } = useThemeStore();

  const handlePressItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    console.log(id)
  };
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };
  const calculateSubtotal = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  React.useEffect(() => {
    const updatedSelectedItems = cartItems.filter(item => item.active);
    setSelectedItems(updatedSelectedItems);
    if (updatedSelectedItems.length > 0) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [cartItems]);

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.headingText, darkMode && styles.headingTextDark]}>Check Out</Text>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onPressItem={handlePressItem}
            onDeleteItem={handleDeleteItem}
          />
        )}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
      <RBSheet
        ref={refRBSheet}
        height={300}
        draggable={true}
        customStyles={{
          container: { 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20, 
            backgroundColor: darkMode ? 'black' : WHITE_COLOR 
          },
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: 'gray' },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Back_Ground,
  },
  containerDark: {
    backgroundColor: 'black',
  },
  headingText: {
    color: THEME_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'right',
  },
  headingTextDark: {
    color: THEME_COLOR,
  },
  flatList: {
    flex: 1,
  },
});

export default CartScreen;
