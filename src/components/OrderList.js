import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Pressable,
} from "react-native";
//color
import {
  Back_Ground,
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
  BLACK_COLOR,
  RED_COLOR,
} from "../res/colors";
//components 
import RBOrderSheet from "./RBOrderSheet";
//zustand
import useThemeStore from "../../zustand/ThemeStore";
import { Frown } from "lucide-react-native";



const OrderList = ({ sections: initialSections, refreshControl }) => {
  const { darkMode } = useThemeStore();
  const [sections, setSections] = useState(initialSections);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const sheetRef = useRef();

  const handleCardPress = (order) => {
    const isSameOrder = selectedOrder?.orderId === order.orderId;
    setSelectedOrder(isSameOrder ? null : order);
    console.log(order)

    if (!isSameOrder) {
      sheetRef.current.open();
    }
  };

  const renderOrderItem = ({ item }) => (
    <OrderCard
      order={item}
      isSelected={selectedOrder && selectedOrder.orderId == item.orderId}
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
      {
        sections.length == 0 && (
          <View style={styles.emptyContainer}>
            <Frown
              size={150}
              color={THEME_COLOR}
              strokeWidth={1.5}
            />
            <Text style={[styles.emptyText, { color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_COLOR }]}>
              You have no orders yet
            </Text>
          </View>
        )
      }
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        renderItem={renderOrderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.sectionListContainer}
        refreshControl={refreshControl}
      />
      <RBOrderSheet sheetRef={sheetRef} selectedOrder={selectedOrder} />
    </View>
  );
};

const OrderCard = ({ order, onPress, isSelected, darkMode }) => {
  const statusColors = {
    pending: THEME_COLOR,
    delivered: THEME_TEXT_COLOR,
    cancelled: RED_COLOR,
    default: THEME_TEXT_COLOR,
  };
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.orderCard,
        {
          borderColor: isSelected ? THEME_COLOR : GRAY_COLOR,
          borderWidth: isSelected ? 2 : 1,
          backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
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
          {order.status.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
  },
  sectionListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginBottom: 15,
  },
  orderCard: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    shadowColor: GRAY_COLOR,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
    marginRight: 15,
  },
  orderId: {
    fontSize: 15,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 12,
    paddingRight: 10,
  },
  price: {
    fontSize: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    justifyContent: "center",
    minWidth: 90,
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 2,
    textAlign: "center",
    fontSize: 13,
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  emptyText: {
    fontSize : 14,
  }
});

export default OrderList; 
