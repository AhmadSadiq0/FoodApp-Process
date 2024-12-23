import React from "react";
import { StyleSheet, View } from "react-native";
import Header1 from "../../components/Header1";
import { Confirm_Order } from "../../res/drawables";
import DeliveryAddress from "../../components/DelivaryComponent";
import PaymentComponent from "../../components/PaymentComponent";
import ConfirmOrderSummary from "../../components/ConfirmOrderSummary";
import { IMAGE25, IMAGE26, IMAGE27 } from "../../res/drawables";

const paymentMethods = [
  { name: "Debit Card", image: IMAGE25 },
  { name: "App Wallet", image: IMAGE26 },
  { name: "Cash on Delivery", image: IMAGE27 },
];

const OrderConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header1 title="Confirm Order" discountIcon={Confirm_Order} />
      <DeliveryAddress/>
      <PaymentComponent paymentMethods = {paymentMethods}/>
      <ConfirmOrderSummary navigation={navigation}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default OrderConfirmationScreen;
