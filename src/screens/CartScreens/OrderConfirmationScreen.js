import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Confirm_Order } from "../../res/drawables";
import { ConfirmOrderSummary, DeliveryAddress, PaymentComponent, Header1, OrderTypeSelector, CustomButton } from "../../components";
import { IMAGE25 } from "../../res/drawables";
import { Back_Ground, WHITE_COLOR, BLACK_COLOR, THEME_COLOR } from "../../res/colors";
import useThemeStore from "../../../zustand/ThemeStore";
import RBSheet from "react-native-raw-bottom-sheet";
import useAuthStore from "../../store/AuthStore";
import useBranchStore from "../../store/BranchStore";
import useOrderStore from "../../store/OrderStore";
import useCartStore from "../../store/CartStore";


const paymentMethods = [
  { name: "Cash on Delivery", image: IMAGE25 },
];

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { selectedItems = [], selectedExtras = [], subtotal = 0 } = route.params || {};
  const { darkMode } = useThemeStore();
  const { user } = useAuthStore();
  const { selectedBranch } = useBranchStore();
  const { createOrder , orders_loading , orders_error } = useOrderStore();
  const { clearCart } = useCartStore()

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderType, setOrderType] = useState("dine_in");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    instructions: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const sheetRef = useRef(null);

  const tax = subtotal * 0.08;
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const totalAmount = subtotal + tax + deliveryFee;

  useEffect(() => {
    let valid = false;
    if (orderType) {
      if (orderType === 'delivery') {
        valid = selectedPayment !== null && address !== null;
      } else {
        valid = selectedPayment !== null;
      }
    }
    setIsFormValid(valid);
    console.log("selectedItems are ", selectedItems);
    console.log("selectedExtras are ", selectedExtras);
    console.log("selected Branch" ,selectedBranch)
  }, [orderType, selectedPayment, address]);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const buildOrderPayload = () => {
    const items = selectedItems.map(item => ({
      itemId: item.itemId,
      name: item.name,
      categoryId: item?.categoryId,
      categoryName: item?.categoryName,
      variant: item.variant,
      quantity: item.quantity,
      unitPrice: item?.variant?.price,
      totalPrice: item?.variant?.price * item?.quantity
    }));

    const extras = selectedExtras.map(extra => ({
      extraId: extra._id,
      name: extra.name,
      quantity: extra.quantity,
      price: extra.price
    }));

    const payload = {
      orderType,
      items,
      extras,
      branchId: selectedBranch?._id,
      payment: {
        method: selectedPayment.name.toLowerCase(),
        status: 'pending',
        amount: totalAmount
      },
      subtotal,
      tax,
      deliveryFee,
      discount: 0,
      totalAmount,
    };

    if (orderType === 'delivery' && address) {
      payload.delivery = {
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country
        },
        contactNumber: address.phone,
        deliveryInstructions: address.instructions
      };
    }

    return payload;
  };

  const handleConfirmOrder =async () => {
    const orderPayload = buildOrderPayload();
    if (!orderPayload) return;
    await createOrder(orderPayload);
    sheetRef.current.close();
    clearCart();
    navigation.navigate("ConfirmedOrder", { orderPayload });
  };

  const renderContent = () => {
    if (!orderType) {
      return (
        <OrderTypeSelector
          onSelect={setOrderType}
          darkMode={darkMode}
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderTypeSelector
          selectedType={orderType}
          onSelect={setOrderType}
          darkMode={darkMode}
        />

        {orderType === 'delivery' && (
          <DeliveryAddress
            onAddressChange={setAddress}
          />
        )}

        <PaymentComponent
          paymentMethods={[
            {
              name: "Cash",
              description: "Pay when you receive your order"
            },
          ]}
          onSelectPayment={handlePaymentSelection}
          selectedMethod={selectedPayment}
          themeColor={THEME_COLOR}
          darkMode={darkMode}
        />
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>

      {renderContent()}

      <RBSheet
        ref={sheetRef}
        height={550}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: darkMode ? '#1E1E1E' : WHITE_COLOR,
          },
        }}
      >
        <ConfirmOrderSummary
          sheetRef={sheetRef}
          selectedItems={selectedItems}
          selectedExtras={selectedExtras}
          subtotal={subtotal}
          tax={tax}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
          paymentMethod={selectedPayment}
          orderType={orderType}
          deliveryAddress={address}
          onButtonPressed={handleConfirmOrder}
          isButtonDisabled={!isFormValid}
          darkMode={darkMode}
          loading={orders_loading}
        />
      </RBSheet>

      {orderType && selectedPayment && (
        <View style={styles.footer}>
          {
            orders_error && (
              <Text style={{ color: 'red' }}>{orders_error}</Text>
            )
          }
          <CustomButton
            title="Confirm Order"
            onPress={() => sheetRef.current.open()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  containerDark: {
    backgroundColor: BLACK_COLOR,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  footerDark: {
    backgroundColor: 'rgba(30,30,30,0.9)',
  },
  confirmButtonTextDark: {
    color: '#DDD',
  },
});

export default OrderConfirmationScreen;