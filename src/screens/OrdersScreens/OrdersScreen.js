import React from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
import Header from "../../components/Header";
import InProgressOrder from "../../components/InProgressOrder";
import { Back_Ground } from "../../res/colors";

const OrdersScreen = () => {
  const allOrders = [
    {
      orderId: "AK-141124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
      deliveredOn: "14/11/2024 11:08 PM"
    },
    {
      orderId: "AK-121124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
      deliveredOn: "14/11/2024 11:08 PM"
    },
    {
      orderId: "AK-111124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "Harry K.",
      deliveredOn: "November 14, 2024 11:39 PM",
      orderDetails: "Double Cheese Burger",
    },
    {
      orderId: "AK-061124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "Sarah J.",
      deliveredOn: "November 13, 2024 10:15 AM",
      orderDetails: "Double Cheese Burger",
    },
    {
      orderId: "AK-281024-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "Huzaifa Saddique",
      deliveredOn: "November 12, 2024 3:45 PM",
      orderDetails: "Double Cheese Burger",
    },
  ];

  const sections = [
    {
      title: "In Progress Orders",
      data: allOrders.filter((order) => order.status === "Preparing"),
    },
    {
      title: "Delivered Orders",
      data: allOrders.filter((order) => order.status === "Delivered"),
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="My Orders"
        Welcomermsg=""
        showSearch={false}
        showShadow={true}
        containerStyle={{
          height: 160,
        }}
        textContainer={{
          marginTop: 0,
        }}
      />
      <InProgressOrder sections={sections} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
});

export default OrdersScreen;
