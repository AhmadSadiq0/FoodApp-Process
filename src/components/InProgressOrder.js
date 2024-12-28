import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Image,
  Pressable,
} from "react-native";
import { BURGERIMG } from "../res/drawables";
import {
  Back_Ground,
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
} from "../res/colors";
import RBOrderSheet from "./RBOrderSheet";
import RBDelivered from "./RBDelivered";

const InProgressOrder = ({ sections }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const sheetRef = useRef();
  const deliveredSheetRef = useRef();

  const openSheet = (order) => {
    if (order.status === "Preparing" || order.status === "Pending") {
      setSelectedOrder(order);
      sheetRef.current.open();
    }
  };

  const openDeliveredSheet = (order) => {
    if (order.status === "Delivered") {
      setSelectedOrder(order);
      deliveredSheetRef.current.open();
    }
  };

  const renderOrderItem = ({ item }) => (
    <OrderCard
      order={item}
      onPress={() =>
        item.status === "Delivered" ? openDeliveredSheet(item) : openSheet(item)
      }
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        renderItem={renderOrderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.sectionListContainer}
      />
      {/* Integrating RBOrderSheet component */}
      <RBOrderSheet sheetRef={sheetRef} selectedOrder={selectedOrder} />
      {/* Integrating RBDelivered component */}
      <RBDelivered sheetRef={deliveredSheetRef} selectedOrder={selectedOrder} />
    </View>
  );
};

const OrderCard = ({ order, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
      case "Pending":
        return "#EF4444";
      case "Delivered":
        return "#10B981";
      default:
        return "#4B5563";
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.orderCard}>
      <View style={styles.textContainer}>
        <Text style={styles.orderId}>{order.orderId}</Text>
        <Text style={styles.itemName}>{order.itemName}</Text>
        <Text style={styles.price}>{order.price}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            { backgroundColor: getStatusColor(order.status) },
          ]}
        >
          {order.status}
        </Text>
        <Image source={BURGERIMG} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  sectionListContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME_COLOR,
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: WHITE_COLOR,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: GRAY_COLOR,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
  },
  itemName: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
  },
  price: {
    fontSize: 16,
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  statusContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    color: WHITE_COLOR,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

export default InProgressOrder;
