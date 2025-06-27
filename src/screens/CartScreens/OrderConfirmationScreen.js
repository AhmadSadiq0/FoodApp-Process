import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Confirm_Order } from "../../res/drawables";
import { ConfirmOrderSummary, DeliveryAddress, PaymentComponent, Header1, OrderTypeSelector, CustomButton } from "../../components";
import { IMAGE25 } from "../../res/drawables";
import { Back_Ground, WHITE_COLOR, BLACK_COLOR, THEME_COLOR, DARK_THEME_BACKGROUND } from "../../res/colors";
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

  const { selectedBranch } = useBranchStore();
   const { createOrder, orders_loading, orders_error } = useOrderStore();
  const { clearCart } = useCartStore();

  const [name, setName] = useState("")
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderType, setOrderType] = useState("dine_in");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    phone : "",
    instructions: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null)
  const sheetRef = useRef(null);
  const paymentRef = useRef(null);

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
      customerName: name,
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
        },
        contactNumber: address.phone,
        deliveryInstructions: address.instructions
      };
    }

    return payload;
  };

  const handleConfirmOrder = async () => {
    const isNameValid = paymentRef.current?.validateName?.();
    if (!isNameValid) {
      Alert.alert("Validation Error", "The name is required to confirm the order.");
      return;
    }

    const orderPayload = buildOrderPayload();
    if (!orderPayload) return;
    const res = await createOrder(orderPayload);
    if (res.success) {
      sheetRef.current.close();
      clearCart();
      navigation.navigate("ConfirmedOrder", { orderPayload });
    } else {
      setError(res.message)
    }

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
          ref={paymentRef}
          name={name}
          setName={setName}
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
        height={490}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
               ...(darkMode && { 
                      borderTopWidth: 3,
                      borderLeftWidth: 3,
                      borderRightWidth: 3,
                      borderColor: THEME_COLOR, 
                    }),
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
       <View style={[styles.footer, darkMode && styles.footerDark]}>
       {
         orders_error && (
           <Text style={{ color: 'red' }}>{orders_error}</Text>
         )
       }
       <CustomButton
         title="Confirm Orderr"
         onPress={() => sheetRef.current.open()}
         buttonStyle={darkMode ? { backgroundColor: BLACK_COLOR } : {}}
         textStyle={darkMode ? { color: WHITE_COLOR } : {}}
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
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // padding: 16,
   // backgroundColor: 'rgba(255,255,255,0.9)',
  },
  footerDark: {
    backgroundColor: BLACK_COLOR,
  },
  confirmButtonTextDark: {
    color: '#DDD',
  },
});

export default OrderConfirmationScreen;