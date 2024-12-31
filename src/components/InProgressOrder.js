import React from "react";
import { StyleSheet, View, SectionList, Text, Image } from "react-native";
import { BURGERIMG } from "../res/drawables";
import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  Green_Color,
} from "../res/colors";

const InProgressOrder = (props) => {
  const { sections } = props;
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
        return THEME_COLOR;
      case "Delivered":
        return Green_Color;
      default:
        return THEME_TEXT_COLOR;
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
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 8,
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
    color: THEME_TEXT_COLOR,

    fontWeight: "600",
  },
  itemName: {
    fontSize: 12,
    color: THEME_TEXT_COLOR,
  },
  price: {
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    color: WHITE_COLOR,

    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
export default InProgressOrder;
