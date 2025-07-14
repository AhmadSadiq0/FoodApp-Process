import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity
} from "react-native";
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
  { name: "Cash on Delivery", value : "cash" , image: IMAGE25 },
];

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { selectedItems = [], selectedExtras = [], subtotal = 0 } = route.params || {};
  const { darkMode } = useThemeStore();
  const { selectedBranch } = useBranchStore();
  const { createOrder, orders_loading, orders_error } = useOrderStore();
  const { clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderType, setOrderType] = useState("delivery");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    phone: "",
    instructions: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState(null);
  const sheetRef = useRef(null);
  const paymentRef = useRef(null);
  const scrollViewRef = useRef(null);

  const tax = subtotal * 0.08;
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const totalAmount = subtotal + tax + deliveryFee;

  useEffect(() => {
    let valid = false;
    if (orderType) {
      if (orderType === 'delivery') {
        valid = selectedPayment !== null &&
          address.street.trim() !== "" &&
          address.city.trim() !== "" &&
          address.phone.trim() !== "";
      } else {
        valid = selectedPayment !== null;
      }
    }
    setIsFormValid(valid);
  }, [orderType, selectedPayment, address, name]);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const buildOrderPayload = () => {
    const items = selectedItems.map(item => ({
      itemId: item.itemId,
      name: item.name,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      variant: {
        _id: item.variant?._id,
        name: item.variant.name,
        price: item.variant.price,
        specifications: item.variant?.specifications?.map(spec => ({
          _id: spec._id,
          key: spec.key,
          value: spec.value
        })) || [],
        toppings: item.variant?.toppings?.map(topping => ({
          _id: topping._id,
          name: topping.name,
          price: topping.price
        })) || []
      },
      quantity: item.quantity,
      unitPrice: item.variant.price,
      totalPrice: item.variant.price * item.quantity,
      notes: item.notes || ''
    }));

    const extras = selectedExtras.map(extra => ({
      extraId: extra._id,
      name: extra.name,
      price: extra.price,
      quantity: extra.quantity
    }));

    const payload = {
      orderType,
      customerName: name,
      items,
      extras,
      branchId: selectedBranch?._id,
      payment: {
        method: selectedPayment?.value.toLowerCase(),
        status: 'pending',
        amount: totalAmount,
        transactionId: '',
        paidAt: undefined
      },
      subtotal,
      tax,
      deliveryFee,
      discount: 0,
      totalAmount,
      notes: ''
    };

    if (orderType === 'delivery' && address) {
      payload.delivery = {
        address: {
          street: address.street,
          city: address.city
        },
        contactNumber: address.phone,
        deliveryInstructions: address.instructions || '',
        estimatedDeliveryTime: undefined,
        actualDeliveryTime: undefined
      };
    }

    return payload;
  };



  const handleConfirmOrder = async () => {
    console.log("Order Payload ===> ", JSON.stringify(buildOrderPayload(), null, 2));
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name");
      return;
    }

    if (orderType === 'delivery' && (!address.street.trim() || !address.city.trim() || !address.phone.trim())) {
      Alert.alert("Validation Error", "Please fill all address fields");
      return;
    }

    const orderPayload = buildOrderPayload();
    const res = await createOrder(orderPayload);

    if (res.success) {
      sheetRef.current?.close();
      clearCart();
      navigation.navigate("ConfirmedOrder", { orderPayload });
    } else {
      setError(res.message);
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
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OrderTypeSelector
          selectedType={orderType}
          onSelect={setOrderType}
          darkMode={darkMode}
        />

        <PaymentComponent
          ref={paymentRef}
          name={name}
          setName={setName}
          paymentMethods={paymentMethods}
          onSelectPayment={handlePaymentSelection}
          selectedMethod={selectedPayment}
          themeColor={THEME_COLOR}
          darkMode={darkMode}
        />

        {orderType === 'delivery' && (
          <DeliveryAddress
            onAddressChange={setAddress}
            address={address}
            scrollToInput={(yPosition) => {
              scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
            }}
            darkMode={darkMode}
          />
        )}
      </ScrollView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 30}
      >
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

          {(orderType && selectedPayment && name) && (
            (orderType !== "delivery" ||
              (address?.street?.trim() && address?.city?.trim() && address?.phone?.trim())) && (
              <View style={[styles.footer, darkMode && styles.footerDark]}>
                {orders_error && (
                  <Text style={{ color: 'red', marginBottom: 10 }}>{orders_error}</Text>
                )}
                <CustomButton
                  title="Confirm Order"
                  onPress={() => sheetRef.current?.open()}
                  style={[
                    styles.confirmButton,
                    darkMode && { backgroundColor: THEME_COLOR }
                  ]}
                  textStyle={darkMode ? { color: WHITE_COLOR } : {}}
                  disabled={!isFormValid}
                />
              </View>
            )
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    flexGrow: 1,
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  footer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerDark: {
    backgroundColor: DARK_THEME_BACKGROUND,
    borderTopColor: THEME_COLOR,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: WHITE_COLOR,
  },
});

export default OrderConfirmationScreen;