import React from "react";
import { StyleSheet, View, SectionList, Text, Image } from "react-native";
import { BURGERIMG } from "../res/drawables";

const InProgressOrder = ({ sections }) => {
  const renderOrderItem = ({ item }) => <OrderCard order={item} />;
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item.orderId}-${index}`}
      renderItem={renderOrderItem}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.sectionListContainer}
    />
  );
};

const OrderCard = ({ order }) => {
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
    <View style={styles.orderCard}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  sectionListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionHeader: {
    color: "#EF4444",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    marginLeft: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  orderId: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  itemName: {
    fontSize: 12,
    color: "#4B5563",
  },
  price: {
    color: "#EF4444",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    marginRight: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
export default InProgressOrder;
