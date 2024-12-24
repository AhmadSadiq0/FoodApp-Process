import React from "react";
import { StyleSheet, View , ScrollView} from "react-native";
import Header1 from "../../components/Header1";
import { Confirm_Order } from "../../res/drawables";
import DeliveryAddress from "../../components/DelivaryComponent";
import PaymentComponent from "../../components/PaymentComponent";
import ConfirmOrderSummary from "../../components/ConfirmOrderSummary";
import { IMAGE25, IMAGE26, IMAGE27 } from "../../res/drawables";
import ConfirmedOrder from "./ConfirmedOrder";
const paymentMethods = [
  { name: "Debit Card", image: IMAGE25 },
  { name: "App Wallet", image: IMAGE26 },
  { name: "Cash on Delivery", image: IMAGE27 },
];
const OrderConfirmationScreen = ({navigation}) => {
  return (
    <View style={styles.container}> 
      <Header1 title="Confirm Order" discountIcon={Confirm_Order} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DeliveryAddress/>
      <PaymentComponent paymentMethods = {paymentMethods}/>
      <ConfirmOrderSummary  onButtonPressed={() => navigation.navigate("ConfirmedOrder")} />
      {/* <ConfirmOrderSummary navigation={navigation} /> */}
      </ScrollView>
    </View>
  );
}; 
const styles = StyleSheet.create({ 
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  scrollContainer: {
    alignItems: "center",
    // paddingVertical: 20, 
    paddingBottom: 60,
  },
});
export default OrderConfirmationScreen;