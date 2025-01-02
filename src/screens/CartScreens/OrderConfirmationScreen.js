import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
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

const OrderConfirmationScreen = (props) => {
  const { navigation } =props
  const sections = [
    { key: "DeliveryAddress", component: <DeliveryAddress /> },
    { key: "PaymentComponent", component: <PaymentComponent paymentMethods={paymentMethods} /> },
    {
      key: "ConfirmOrderSummary",
      component: (
        <ConfirmOrderSummary
          onButtonPressed={() => navigation.navigate("ConfirmedOrder")}
        />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <Header1 title="Confirm Order" discountIcon={Confirm_Order} />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View>{item.component}</View>}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 60,
  },
});
export default OrderConfirmationScreen;
