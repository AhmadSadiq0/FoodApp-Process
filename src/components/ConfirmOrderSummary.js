import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButtom";
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  LIGHT_GRAY,
  DARK_GRAY,
} from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const ConfirmOrderSummary = (props) => {
  const {
    selectedItems = [],
    selectedExtras = [],
    subtotal = 0,
    tax = 0,
    deliveryFee = 0,
    totalAmount = 0,
    onButtonPressed = () => { },
    paymentMethod = { name: "Cash on Delivery" },
    orderType = "delivery",
    deliveryAddress = null,
    isButtonDisabled = false,
    darkMode = false,
    loading = false
  } = props;

  const { darkMode: themeDarkMode } = useThemeStore();
  const finalDarkMode = darkMode || themeDarkMode;

  const renderItemRow = (item, isExtra = false) => (
    <View key={item._id} style={styles.itemRow}>
      <Text style={[styles.itemText, finalDarkMode && styles.itemTextDark]}>
        {item.quantity}x {item.name}
      </Text>
      <Text style={styles.itemPrice}>
        Rs. {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
  const handleConfirmationPress = () => {
    if (orderType === 'delivery') {
      // Show alert only for delivery
      if (!deliveryAddress) {
        alert('Please select the delivery address before confirming your order');
        return;
      }

      if (
        !deliveryAddress?.street ||
        !deliveryAddress?.city ||
        !deliveryAddress?.phone ||
        !deliveryAddress?.instructions
      ) {
        alert('Please complete your delivery address information (street, city, state, and zip code) before confirming your order.');
        return;
      }
    }

    onButtonPressed();
  };



  return (
    <ScrollView
      style={[styles.container, finalDarkMode && styles.containerDark]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Order Type Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons
            name={orderType === 'delivery' ? 'car' : orderType === 'pickup' ? 'walk' : 'restaurant'}
            size={20}
            color={finalDarkMode ? WHITE_COLOR : THEME_COLOR}
          />
          <Text style={[styles.sectionTitle, finalDarkMode && styles.sectionTitleDark]}>
            {orderType.replace(/_/g, ' ').toUpperCase()}
          </Text>
        </View>

        {orderType === 'delivery' && deliveryAddress && (
          <View style={styles.addressContainer}>
            {
              deliveryAddress && deliveryAddress.street && (
                <Text style={[styles.addressText, finalDarkMode && styles.addressTextDark]}>
                  {deliveryAddress.street} - {deliveryAddress.city}
                </Text>
              )
            }
            {
              deliveryAddress && deliveryAddress.phone && (
                <Text style={[styles.addressText, finalDarkMode && styles.addressTextDark]}>
                  {deliveryAddress.phone}
                </Text>
              )
            }
            {
              deliveryAddress && deliveryAddress.instructions && (
                <Text style={[styles.addressText, finalDarkMode && styles.addressTextDark]}>
                  {deliveryAddress.instructions}
                </Text>
              )
            }

          </View>
        )}
      </View>

      {/* Items Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, finalDarkMode && styles.sectionTitleDark]}>
          ITEMS ({selectedItems.length})
        </Text>
        {selectedItems.map(item => renderItemRow(item))}
      </View>

      {/* Extras Section */}
      {selectedExtras.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, finalDarkMode && styles.sectionTitleDark]}>
            EXTRAS ({selectedExtras.length})
          </Text>
          {selectedExtras.map(extra => renderItemRow(extra, true))}
        </View>
      )}

      {/* Price Breakdown */}
      <View style={styles.section}>
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, finalDarkMode && styles.priceLabelDark]}>Subtotal</Text>
          <Text style={styles.priceValue}>Rs. {subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, finalDarkMode && styles.priceLabelDark]}>Tax (8%)</Text>
          <Text style={styles.priceValue}>Rs. {tax.toFixed(2)}</Text>
        </View>

        {orderType === 'delivery' && (
          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, finalDarkMode && styles.priceLabelDark]}>Delivery Fee</Text>
            <Text style={styles.priceValue}>Rs. {deliveryFee.toFixed(2)}</Text>
          </View>
        )}

        <View style={[styles.priceRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, finalDarkMode && styles.totalLabelDark]}>Total</Text>
          <Text style={styles.totalValue}>Rs. {totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons
            name="card"
            size={20}
            color={finalDarkMode ? WHITE_COLOR : THEME_COLOR}
          />
          <Text style={[styles.sectionTitle, finalDarkMode && styles.sectionTitleDark]}>
            PAYMENT METHOD
          </Text>
        </View>
        <Text style={[styles.paymentMethod, finalDarkMode && styles.paymentMethodDark]}>
          {paymentMethod?.name || "Cash on Delivery"}
        </Text>
      </View>

      {/* Confirm Button */}
      <CustomButton
        title="Confirm Orderr"
        textStyle={styles.buttonText}
        buttonStyle={[styles.button, isButtonDisabled && styles.disabledButton]}
        //onPress={onButtonPressed}
        onPress={handleConfirmationPress}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 20,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 5,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
  },
  sectionDark: {
    backgroundColor: DARK_GRAY,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME_TEXT_COLOR,
  },
  sectionTitleDark: {
    color: WHITE_COLOR,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    flex: 2,
  },
  itemTextDark: {
    color: '#DDD',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLOR,
    flex: 1,
    textAlign: 'right',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceLabelDark: {
    color: '#CCC',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_TEXT_COLOR,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_TEXT_COLOR,
  },
  totalLabelDark: {
    color: WHITE_COLOR,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLOR,
  },
  addressContainer: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addressTextDark: {
    color: '#CCC',
  },
  paymentMethod: {
    fontSize: 14,
    color: THEME_COLOR,
    fontWeight: '500',
    marginTop: 8,
  },
  paymentMethodDark: {
    color: WHITE_COLOR,
  },
  button: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmOrderSummary;