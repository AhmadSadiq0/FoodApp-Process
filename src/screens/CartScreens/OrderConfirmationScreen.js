import React from "react";
import { StyleSheet, View , ScrollView} from "react-native";
import Header1 from "../../components/Header1";
import { useNavigation } from "@react-navigation/native";
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
const OrderConfirmationScreen = () => {
   const navigation = useNavigation();
  return (
    <View style={styles.container}> 
          <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header1 title="Confirm Order" discountIcon={Confirm_Order} />
      <DeliveryAddress/>
      <PaymentComponent paymentMethods = {paymentMethods}/>
      <ConfirmOrderSummary onButtonPressed={() => console.log("Button Pressed")}/>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ 
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20, 
  },
});
export default OrderConfirmationScreen;
