// OrderConfirmationScreen.js
import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { Confirm_Order } from "../../res/drawables";
//component
import { ConfirmOrderSummary,DeliveryAddress,PaymentComponent,Header1 } from "../../components";
//images
import { IMAGE25, IMAGE26, IMAGE27 } from "../../res/drawables";
//colors
import { Back_Ground } from "../../res/colors";
//RawBottomSheet
import RBSheet from "react-native-raw-bottom-sheet";


const paymentMethods = [
  { name: "Debit Card", image: IMAGE25 },
  { name: "App Wallet", image: IMAGE26 },
  { name: "Cash on Delivery", image: IMAGE27 },
];


const OrderConfirmationScreen = (props) => {
  const { navigation } = props;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const sheetRef = useRef(null);
  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    sheetRef.current.open();
  };

  const handleCloseSheet = () => {
    setSelectedPayment(null );
    sheetRef.current.close();
  };


  return (
    <View style={styles.container}>
      <Header1 title="Order Confirmation" />
      <DeliveryAddress />
      <PaymentComponent paymentMethods={paymentMethods} onSelectPayment={handlePaymentSelection} />
      <RBSheet
        ref={sheetRef}
        height={350}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: Back_Ground,
          },
        }}
      >
       <ConfirmOrderSummary
          sheetRef={sheetRef}
          selectedOrder={selectedPayment}
          onButtonPressed={() => navigation.navigate("ConfirmedOrder")}
        />
      </RBSheet>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
    
  },
});

export default OrderConfirmationScreen;