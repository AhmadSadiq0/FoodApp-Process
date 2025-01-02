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
  Green_Color,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
} from "../res/colors";
import RBOrderSheet from "./RBOrderSheet";
import RBDelivered from "./RBDelivered";

const InProgressOrder = ({ sections: initialSections }) => {
  const [sections, setSections] = useState(initialSections);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const sheetRef = useRef();
  const deliveredSheetRef = useRef();

  const handleCardPress = (order) => {
    const isSameOrder = selectedOrder?.orderId === order.orderId;
    setSelectedOrder(isSameOrder ? null : order);

    if (!isSameOrder) {
      const sheet = order.status === "Delivered" ? deliveredSheetRef : sheetRef;
      sheet.current.open();
    }

    setSections((prevSections) => reorderSections(prevSections, order));
  };

  const reorderSections = (sections, order) => {
    const updatedSections = [...sections];
    const sectionIndex = updatedSections.findIndex((section) =>
      section.data.some((item) => item.orderId === order.orderId)
    );

    if (sectionIndex !== -1) {
      const [selectedSection] = updatedSections.splice(sectionIndex, 1);
      selectedSection.data.sort((a, b) => (a.orderId === order.orderId ? -1 : 1));
      updatedSections.unshift(selectedSection);
    }

    return updatedSections;
  };

  const renderOrderItem = ({ item }) => (
    <OrderCard
      order={item}
      isSelected={selectedOrder?.orderId === item.orderId}
      onPress={() => handleCardPress(item)}
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
      <RBOrderSheet sheetRef={sheetRef} selectedOrder={selectedOrder} />
      <RBDelivered sheetRef={deliveredSheetRef} selectedOrder={selectedOrder} />
    </View>
  );
};

const OrderCard = ({ order, onPress, isSelected }) => {
  const statusColors = {
    Preparing: THEME_COLOR,
    Delivered: Green_Color,
    default: "#4B5563",
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.orderCard,
        {
          borderColor: isSelected ? THEME_COLOR : "transparent",
          borderWidth: isSelected ? 2 : 0,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.orderId}>{order.orderId}</Text>
        <Text style={styles.itemName}>{order.itemName}</Text>
        <Text style={styles.price}>{order.price}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            { backgroundColor: statusColors[order.status] || statusColors.default },
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
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: GRAY_COLOR,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    fontWeight: "600",
  },
  itemName: {
    fontSize: 12,
    color: THEME_TEXT_COLOR,
  },
  price: {
    fontSize: 12,
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    paddingHorizontal: 2,
    borderRadius: 12,
    width: 80,
    height: 20,
    color: WHITE_COLOR,
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default InProgressOrder;
