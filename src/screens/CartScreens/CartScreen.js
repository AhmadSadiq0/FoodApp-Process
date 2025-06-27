import React, { useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  CartItem,
  CustomButton,
  SummaryCard
} from '../../components';
import {
  Back_Ground,
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  LIGHT_GRAY,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
  LIGHT_THEME_BACKGROUND
} from '../../res/colors';
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
    const parentItem = items.find(item => item.id === parentId); const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Back_Ground,
        paddingHorizontal: 16,
        paddingTop: 50,
      },
      containerDark: {
        backgroundColor: DARK_THEME_BACKGROUND,
      },
      headingText: {
        color: THEME_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: "right",
      },
      headingTextDark: {
        color: DARK_THEME_TEXT_COLOR,
      },
      sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Back_Ground,
      },
      extrasContainer: {
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: GRAY_COLOR,
        backgroundColor: LIGHT_THEME_BACKGROUND,
      },
      extrasContainerDark: {
        backgroundColor: DARK_THEME_BACKGROUND,
        borderColor: DARK_THEME_TEXT_COLOR,
      },
      extrasHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      extrasTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME_TEXT_COLOR,
      },
      extrasTitleDark: {
        color: DARK_THEME_TEXT_COLOR,
      },
      extrasCountBadge: {
        borderRadius: 10,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME_COLOR,
      },
      extrasCountText: {
        color: WHITE_COLOR,
        fontSize: 12,
        fontWeight: 'bold',
      },
      extraItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: WHITE_COLOR,
        borderColor: GRAY_COLOR,
        borderWidth: 1,
      },
      extraItemDark: {
        backgroundColor: DARK_THEME_BACKGROUND,
        borderColor: DARK_THEME_TEXT_COLOR,
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
      extraName: {
        fontSize: 16,
        fontWeight: '600',
        color: BLACK_COLOR,
      },
      extraNameDark: {
        color: WHITE_COLOR,
      },
      extraParent: {
        fontSize: 13,
        color: GRAY_COLOR,
        marginTop: 4,
      },
      extraParentDark: {
        color: DARK_THEME_TEXT_COLOR,
      },
      extraBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
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
        backgroundColor: LIGHT_GRAY,
      },
      extraQtyButtonDark: {
        backgroundColor: DARK_THEME_TEXT_COLOR,
      },
      extraQtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BLACK_COLOR,
      },
      extraQtyTextDark: {
        color: WHITE_COLOR,
      },
      extraQtyValue: {
        fontSize: 15,
        fontWeight: '600',
        marginHorizontal: 10,
        textAlign: 'center',
        color: BLACK_COLOR,
      },
      extraQtyValueDark: {
        color: WHITE_COLOR,
      },
      extraPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME_COLOR,
      },
      bottomButtonContainer: {
        padding: 16,
        backgroundColor: WHITE_COLOR,
        borderTopWidth: 1,
        borderColor: GRAY_COLOR,
      },
      bottomButtonContainerDark: {
        backgroundColor: DARK_THEME_BACKGROUND,
        borderColor: DARK_THEME_TEXT_COLOR,
      },
    });

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
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={items}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  onDeleteItem={removeItem}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                />
              )}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={<>
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
              </>}
            />
          </>
      }

      {(items.length > 0 || allExtras.length > 0) && (

        <View
          style={[
            styles.bottomButtonContainer,
            { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }
          ]}
        >
          <CustomButton
            title={`Review Order (${items.filter(item => item.active).length})`}
            onPress={handleAddToCartPress}
          />
        </View>
      )}
      <RBSheet
        ref={summarySheetRef}
        height={340}
        draggable={true}
        customStyles={{
          container: [
            styles.sheetContainer,
            {
              ...(darkMode && {
                borderLeftWidth: 3,
                borderRightWidth: 3,
                borderColor: THEME_COLOR,
                borderTopWidth: 3,
              }),
            },

            darkMode && { backgroundColor: DARK_THEME_BACKGROUND },

          ],
          draggableIcon: { backgroundColor: GRAY_COLOR },
        }}
      >
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
    backgroundColor: Back_Ground,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  containerDark: {
    // backgroundColor: DARK_THEME_BACKGROUND,
    backgroundColor: BLACK_COLOR,
  },
  headingText: {
    color: THEME_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: "right",
  },
  headingTextDark: {
    color: DARK_THEME_TEXT_COLOR,
  },
  sheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Back_Ground,
  },
  extrasContainer: {
    marginTop: 16,
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: GRAY_COLOR,
    backgroundColor: LIGHT_THEME_BACKGROUND,
  },
  extrasContainerDark: {
    backgroundColor: DARK_THEME_BACKGROUND,
    borderColor: DARK_THEME_TEXT_COLOR,
  },
  extrasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  extrasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_TEXT_COLOR,
  },
  extrasTitleDark: {
    color: DARK_THEME_TEXT_COLOR,
  },
  extrasCountBadge: {
    borderRadius: 10,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLOR,
  },
  extrasCountText: {
    color: WHITE_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: WHITE_COLOR,
    borderColor: GRAY_COLOR,
    borderWidth: 1,
  },
  extraItemDark: {
    backgroundColor: DARK_THEME_BACKGROUND,
    borderColor: DARK_THEME_TEXT_COLOR,
  },
  extraImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  extraDeleteIcon: {
    left: "90%",
    width: 24,
    height: 24,
  },
  extraContent: {
    flex: 1,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '600',
    color: BLACK_COLOR,
  },
  extraNameDark: {
    color: WHITE_COLOR,
  },
  extraParent: {
    fontSize: 13,
    color: GRAY_COLOR,
    marginTop: 4,
  },
  extraParentDark: {
    color: DARK_THEME_TEXT_COLOR,
  },
  extraBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
    backgroundColor: LIGHT_GRAY,
  },
  extraQtyButtonDark: {
    backgroundColor: DARK_THEME_TEXT_COLOR,
  },
  extraQtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK_COLOR,
  },
  extraQtyTextDark: {
    color: WHITE_COLOR,
  },
  extraQtyValue: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 10,
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  extraQtyValueDark: {
    color: WHITE_COLOR,
  },
  extraPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME_COLOR,
  },
  bottomButtonContainer: {
    padding: 16,
    backgroundColor: WHITE_COLOR,
    borderTopWidth: 1,
    borderColor: GRAY_COLOR,
  },
  bottomButtonContainerDark: {
    backgroundColor: DARK_THEME_BACKGROUND,
    borderColor: DARK_THEME_TEXT_COLOR,
  },
});

export default CartScreen;    