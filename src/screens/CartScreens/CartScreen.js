import React, { useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CartItem, SummaryCard } from '../../components';
import { Back_Ground, GRAY_COLOR, THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from '../../res/colors';
import useThemeStore from "../../../zustand/ThemeStore";
import useCartStore from "../../store/CartStore";

const CartScreen = ({ navigation }) => {
  const { items, removeItem, toggleItemActive } = useCartStore();
  const { darkMode } = useThemeStore();
  const summarySheetRef = useRef(null);
  const handlePressItem = (id) => {
    toggleItemActive(id);
    const hasActiveItems = items.some(item => item.active);
    hasActiveItems ? summarySheetRef.current.open() : summarySheetRef.current.close();
  };
  const calculateSubtotal = () => {
    return items.filter(item => item.active).reduce((total, item) => total + item.price, 0);
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.headingText, darkMode && styles.headingTextDark]}>Check Out</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onPressItem={handlePressItem}
              onDeleteItem={removeItem}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
      <RBSheet
        ref={summarySheetRef}
        height={300}
        draggable={true}
        customStyles={{
          container: styles.sheetContainer,
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
      >
        <SummaryCard
          selectedItems={items.filter(item => item.active)}
          subtotal={calculateSubtotal()}
          onCheckout={() => navigation.navigate("ConfirmOrder")}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: WHITE_COLOR,
  },
});
export default CartScreen;