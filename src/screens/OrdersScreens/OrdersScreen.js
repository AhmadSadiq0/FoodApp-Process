import React from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";
//Components
import { InProgressOrder,  } from "../../components";
//colors
import { Back_Ground } from "../../res/colors";
import useAuthStore from "../../store/AuthStore";

const OrdersScreen = () => {
  const { user } = useAuthStore();
  const allOrders = [
    {
      orderId: "AK-141124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
      deliveredOn: "14/11/2024 11:08 PM",
    },
    {
      orderId: "AK-121124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Preparing",
      deliveredOn: "14/11/2024 11:08 PM",
    },
    {
      orderId: "AK-111124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "Husnain",
      deliveredOn: "November 14, 2024 11:39 PM",
      orderDetails: "Double Cheese Burger",
    },
    {
      orderId: "AK-061124-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "ZainZaka",
      deliveredOn: "November 13, 2024 10:15 AM",
      orderDetails: "Double Cheese Burger",
    },
    {
      orderId: "AK-281024-DCB07",
      itemName: "Double Cheese Burger",
      price: "Rs. 590/-",
      status: "Delivered",
      deliveredBy: "ZainZaka",
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
      title: "Orders History",
      data: allOrders.filter((order) => order.status === "Delivered"),
    },
  ];  
  return (
    <View style={styles.container}>

      <InProgressOrder sections={sections} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground ,
  },
});
export default OrdersScreen;
