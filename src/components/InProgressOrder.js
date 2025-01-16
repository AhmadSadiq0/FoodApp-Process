import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Image,
  Pressable,
} from "react-native";
//image
import { BURGERIMG } from "../res/drawables";
//color
import {
  Back_Ground,
  GRAY_COLOR,
  Green_Color,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
  DARK_STATUS_COLOR,
  BLACK_COLOR,
} from "../res/colors";
//components 
import RBOrderSheet from "./RBOrderSheet";
import RBDelivered from "./RBDelivered";
//zustand
import useThemeStore from "../../zustand/ThemeStore";
const InProgressOrder = ({ sections: initialSections }) => {
  const { darkMode } = useThemeStore();
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
      isSelected={ selectedOrder && selectedOrder.orderId == item.orderId}
      onPress={() => handleCardPress(item)}
      darkMode={darkMode}
    />
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={[styles.sectionHeader, { color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_COLOR }]}>
      {title}
    </Text>
  );
  return (
    <View style={[styles.container, { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        renderItem={renderOrderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.sectionListContainer}
      />
      <RBOrderSheet sheetRef={sheetRef} selectedOrder={selectedOrder}  />
      <RBDelivered sheetRef={deliveredSheetRef} selectedOrder={selectedOrder} />
    </View>
  );
};
const OrderCard = ({ order, onPress, isSelected, darkMode }) => {
  const statusColors = {
    Preparing: THEME_COLOR,
    Delivered: Green_Color,
    default: GRAY_COLOR,
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.orderCard,
        {
          borderColor: isSelected ? THEME_COLOR : "transparent",
          borderWidth: isSelected ? 2 : 0,
          backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
          backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.orderId, { color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR }]}>
          {order.orderId}
        </Text>
        <Text style={[styles.itemName, { color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR }]}>
          {order.itemName}
        </Text>
        <Text style={[styles.price, { color: darkMode ? THEME_COLOR : THEME_COLOR }]}>
          {order.price}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: statusColors[order.status] || statusColors.default,
              color: darkMode ? WHITE_COLOR : WHITE_COLOR, 
            },
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
  },
  sectionListContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderCard: {
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
  },
  itemName: {
    fontSize: 12,
  },
  price: {
    fontSize: 12,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default InProgressOrder;
