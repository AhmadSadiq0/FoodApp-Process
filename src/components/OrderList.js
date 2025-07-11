import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Pressable,
  Image
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
import {SAD_ICON2 } from "../res/drawables";

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
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground }]}>
      {
        sections.length == 0 && (
          <View style={styles.emptyContainer}>
            <Image source={SAD_ICON2} style={styles.Image} />
            <Text style={[
              styles.emptyText,
              {
                color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_COLOR,
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 22,
                textAlign: 'center',
              },
            ]}>
              You have no orders yet.
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
          backgroundColor: darkMode ? DARK_THEME_BACKGROUND: WHITE_COLOR,
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
    //paddingTop: 25
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    // fontWeight and fontSize will be overridden inline for bold and larger text
  },
  Image : {
    width : 120,
    height : 120,
    resizeMode : "contain",
    tintColor: THEME_COLOR,
  }
});

export default OrderList; 
