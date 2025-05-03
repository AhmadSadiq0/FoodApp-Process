import React, { useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CartItem, CustomButton, SummaryCard } from '../../components';
import { Back_Ground, GRAY_COLOR, THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR, BLACK_COLOR, LIGHT_GRAY } from '../../res/colors';
import useThemeStore from "../../../zustand/ThemeStore";
import useCartStore from "../../store/CartStore";
import { DELETE_ICON } from '../../res/drawables';
import EmptyCart from './EmptyCart';
const CartScreen = ({ navigation }) => {
  const { items, removeItem, toggleItemActive, updateExtraQuantity, updateItemQuantity, updateItemExtras } = useCartStore();
  const { darkMode } = useThemeStore();
  const summarySheetRef = useRef(null);

  const handleIncrease = (id) => {
    updateItemQuantity(id, 1);
  };

  const handleDecrease = (id) => {
    updateItemQuantity(id, -1);
  };

  const handleExtraQuantityChange = (parentId, extraId, action) => {
    updateExtraQuantity(parentId, extraId, action === 'increase' ? 1 : -1);
  };

  const calculateSubtotal = () => {
    return items.filter(item => item.active).reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const extrasTotal = item.extras?.reduce((sum, extra) => sum + (extra.price * extra.quantity), 0) || 0;
      return total + itemTotal + extrasTotal;
    }, 0);
  };

  const allExtras = items
    // .filter(item => item.extras?.length > 0)
    .filter(item => item.active && item.extras?.length > 0)
    .flatMap(item =>
      item.extras.map(extra => ({
        ...extra,
        parentId: item.id,
        parentName: item.name
      })))
    .filter(extra => extra.quantity > 0);

  const handleAddToCartPress = () => {
    summarySheetRef.current.open();
  };

  const handleCheckout = () => {
    summarySheetRef.current.close();
    navigation.navigate("ConfirmOrder", {
      selectedItems: items.filter(item => item.active),
      selectedExtras: allExtras,
      subtotal: calculateSubtotal(),
    });
  };

  const handleRemoveExtra = (parentId, extraId) => {
    // removeExtra(extraId);
    const parentItem = items.find(item => item.id === parentId);

    if (parentItem) {
      const updatedExtras = parentItem.extras.filter(extra => extra._id !== extraId);
      updateItemExtras(parentId, updatedExtras);
    }
  };


  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      {
        items.length === 0 ?
          <EmptyCart navigation={navigation} /> :
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Text style={[styles.headingText, darkMode && styles.headingTextDark]}>Check Out</Text> */}
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  // onPressItem={handlePressItem}
                  onDeleteItem={removeItem}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />

            {allExtras.length > 0 && (
              <View style={[
                styles.extrasContainer,
                {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9',
                  borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e1e1e1'
                }
              ]}>
                <View style={styles.extrasHeader}>
                  <Text style={[
                    styles.extrasTitle,
                    { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
                  ]}>
                    Extras
                  </Text>
                  <View style={[styles.extrasCountBadge, { backgroundColor: THEME_COLOR }]}>
                    <Text style={styles.extrasCountText}>{allExtras.length}</Text>
                  </View>
                </View>

                {allExtras.map((extra, index) => (
                  <View

                    key={`${extra.parentId}-${extra._id || index}`}
                    style={[
                      styles.extraItem,
                      {
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : WHITE_COLOR,
                        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e1e1e1'
                      }
                    ]}
                  >
                    {extra.image && (
                      <Image
                        source={{ uri: extra.image }}
                        style={styles.extraImage}
                        resizeMode="cover"
                      />
                    )}

                    <View style={styles.extraContent}>
                      <TouchableOpacity
                        style={styles.extraDeleteButton}
                        onPress={() => handleRemoveExtra(extra.parentId, extra._id)}
                      >
                        <Image
                          style={styles.extraDeleteIcon}
                          source={DELETE_ICON}
                          tintColor={THEME_COLOR}
                        />
                      </TouchableOpacity>
                      <View style={styles.extraInfoContainer}>
                        <Text style={[styles.extraName, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                          {extra.name}
                        </Text>
                        <Text style={[styles.extraParent, { color: darkMode ? GRAY_COLOR : '#666' }]}>
                          with {extra.parentName}
                        </Text>
                      </View>

                      <View style={styles.extraBottomRow}>
                        <View style={styles.extraQuantityContainer}>
                          <TouchableOpacity
                            style={[
                              styles.extraQtyButton,
                              {
                                backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
                                opacity: extra.quantity <= 1 ? 0.5 : 1
                              }
                            ]}
                            onPress={() => handleExtraQuantityChange(extra.parentId, extra._id, 'decrease')}
                            disabled={extra.quantity <= 1}
                          >
                            <Text style={[
                              styles.extraQtyText,
                              { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
                            ]}>−</Text>
                          </TouchableOpacity>

                          <Text style={[styles.extraQtyValue, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                            {extra.quantity}
                          </Text>

                          <TouchableOpacity
                            style={[
                              styles.extraQtyButton,
                              { backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }
                            ]}
                            onPress={() => handleExtraQuantityChange(extra.parentId, extra._id, 'increase')}
                          >
                            <Text style={[styles.extraQtyText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                              ＋
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text style={[styles.extraPrice, { color: THEME_COLOR }]}>
                          Rs.{(extra.price)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
      }

      {(items.length > 0 || allExtras.length > 0) && (
        <View style={styles.bottomButtonContainer}>

          <CustomButton
            title={`Review Order (${items.filter(item => item.active).length})`}
            onPress={handleAddToCartPress}
          />
        </View>
      )}
      <RBSheet
        ref={summarySheetRef}
        height={500}
        draggable={true}
        customStyles={{
          container: styles.sheetContainer,
          wrapper: { backgroundColor: 'transparent' },
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
      >
        {/* <SummaryCard
          selectedItems={items.filter(item => item.active)}
          subtotal={calculateSubtotal()}
          onCheckout={() => [summarySheetRef.current.close() ,navigation.navigate("ConfirmOrder")]}
        /> */}
        <SummaryCard
          selectedItems={items.filter(item => item.active)}
          selectedExtras={allExtras}
          subtotal={calculateSubtotal()}
          onCheckout={handleCheckout}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    margin: 16,
  },
  containerDark: {
    backgroundColor: 'black',
  },
  headingText: {
    color: THEME_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: "right",
  },
  headingTextDark: {
    color: THEME_COLOR,
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: WHITE_COLOR,
  },
  extrasContainer: {
    marginTop: 16,
    padding: 0,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  extrasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  extrasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  extrasCountBadge: {
    marginLeft: 10,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extrasCountText: {
    color: WHITE_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
  extraItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  extraImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  extraContent: {
    flex: 1,
  },
  extraInfoContainer: {
    marginBottom: 8,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '600',
  },
  extraParent: {
    fontSize: 13,
    marginTop: 2,
  },
  extraBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraQtyButton: {
    borderRadius: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraQtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  extraQtyValue: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  extraPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  extraDeleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
    zIndex: 1,
  },
  extraDeleteIcon: {
    height: 24,
    width: 24,
  },
});

export default CartScreen;