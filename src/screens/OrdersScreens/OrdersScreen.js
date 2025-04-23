import React,{useEffect} from "react";
import { StyleSheet, View, SectionList, Text,ActivityIndicator } from "react-native";
//Components
import { InProgressOrder,  } from "../../components";
//colors
import { Back_Ground } from "../../res/colors";
//Global State
import useAuthStore from "../../store/AuthStore";
import useOrderStore from "../../store/OrderStore";

  const OrdersScreen = () => {
    const {
      fetchOrders,
      orders,
      orders_loading,
      orders_error,
    } = useOrderStore();
    // console.log('orders_error:', orders_error);
    // console.log('orders:', orders);
    // console.log('orders_loading:', orders_loading);
    // console.log("fetchOrders:", fetchOrders);
  const { user } = useAuthStore();
 
  useEffect(() => {
    fetchOrders();
  }, []);
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

  if (orders_loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // if (orders_error) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <Text style={{ color: 'red' }}>{orders_error}</Text>
  //     </View>
  //   );
  // }
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
