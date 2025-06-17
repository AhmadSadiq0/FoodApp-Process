import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, RefreshControl, StatusBar } from "react-native";
// Components
import { OrderList } from "../../components";
// Colors
import { Back_Ground, THEME_COLOR, DARK_THEME_BACKGROUND } from "../../res/colors";
// Global State
import useAuthStore from "../../store/AuthStore";
import useUserOrderStore from "../../store/UserStore";
import useThemeStore from "../../../zustand/ThemeStore";


const OrdersScreen = () => {
  const {
    userOrders,
    userOrders_loading,
    userOrders_error,
    fetchUserOrders,
  } = useUserOrderStore();
  const { darkMode } = useThemeStore();

  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    await fetchUserOrders();
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    loadOrders();
    setRefreshing(false);
  };

  if (userOrders_loading && !refreshing) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground }]}>
        <ActivityIndicator size="large" color={THEME_COLOR} />
      </View>
    );
  }

  if (userOrders_error) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground }]}>
        <Text>Error loading orders: {userOrders_error}</Text>
      </View>
    );
  }

  // Transform the API data into the format your component expects
  const transformOrder = (order) => ({
    ...order,
    orderId: order.orderNumber,
    itemName: order.items.map(item => item.name).join(", "),
    price: `Rs. ${order.totalAmount.toFixed(2)}/-`,
    status: order.status,
    deliveredOn: new Date(order.updatedAt).toLocaleString(),
  });

  const inProgressOrders = userOrders
    .filter(order => ["pending", "preparing", "out_for_delivery", "confirmed", "ready"].includes(order.status))
    .map(transformOrder);

  const orderHistory = userOrders
    .filter(order => ["delivered", "cancelled"].includes(order.status))
    .map(transformOrder);

  const sections = [];

  if (inProgressOrders.length > 0) {
    sections.push({
      title: "In Progress Orders",
      data: inProgressOrders,
    });
  }

  if (orderHistory.length > 0) {
    sections.push({
      title: "Orders History",
      data: orderHistory,
    });
  }



  return (
    <View style={styles.container}>
      <StatusBar
        // barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={darkMode ? DARK_THEME_BACKGROUND : Back_Ground}
      />
      <OrderList
        sections={sections}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[THEME_COLOR]}
            tintColor={THEME_COLOR}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 26,
    backgroundColor: Back_Ground,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;