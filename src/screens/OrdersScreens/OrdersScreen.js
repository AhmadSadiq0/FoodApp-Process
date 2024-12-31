import React from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
import Header from "../../components/Header";
import InProgressOrder from "../../components/InProgressOrder";

const OrdersScreen = () => {
  const allOrders = [
    {
      orderId: "AK-141124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
    },
    {
      orderId: "AK-121124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
    },
    {
      orderId: "AK-111124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
    },
    {
      orderId: "AK-061124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
    },
    {
      orderId: "AK-281024-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
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
    backgroundColor: "#F3F4F6",
  },
});
export default OrdersScreen;
