import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, RefreshControl } from "react-native";
// Components
import { OrderList } from "../../components";
// Colors
import { Back_Ground, THEME_COLOR } from "../../res/colors";
// Global State
import useAuthStore from "../../store/AuthStore";
import useUserOrderStore from "../../store/UserStore";

const OrdersScreen = () => {
  const {
    userOrders,
    userOrders_loading,
    userOrders_error,
    fetchUserOrders,
  } = useUserOrderStore();

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
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={THEME_COLOR} />
      </View>
    );
  }

  if (userOrders_error) {
    return (
      <View style={[styles.container, styles.center]}>
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

  const sections = [
    {
      title: "In Progress Orders",
      data: userOrders
        .filter(order => ["pending", "preparing", "out_for_delivery", "confirmed", "ready"].includes(order.status))
        .map(transformOrder),
    },
    {
      title: "Orders History",
      data: userOrders
        .filter(order => ["delivered", "cancelled"].includes(order.status))
        .map(transformOrder),
    },
  ];

  return (
    <View style={styles.container}>
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
    paddingTop: 26,
    backgroundColor: Back_Ground,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;