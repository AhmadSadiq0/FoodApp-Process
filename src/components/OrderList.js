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
import { ARROW_ICON, BURGERIMG } from "../res/drawables";
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
  RED_COLOR,
} from "../res/colors";
//components 
import RBOrderSheet from "./RBOrderSheet";
import RBDelivered from "./RBDelivered";
//zustand
import useThemeStore from "../../zustand/ThemeStore";
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
          borderColor: isSelected ? THEME_COLOR : "transparent",
          borderWidth: isSelected ? 2 : 0,
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
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  orderCard: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: GRAY_COLOR,
<<<<<<< Updated upstream:src/components/OrderList.js
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
=======
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  }, 
>>>>>>> Stashed changes:src/components/InProgressOrder.js
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemName: {
<<<<<<< Updated upstream:src/components/OrderList.js
    fontSize: 12,
    paddingRight : 10,
=======
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
>>>>>>> Stashed changes:src/components/InProgressOrder.js
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
  },
  status: {
<<<<<<< Updated upstream:src/components/OrderList.js
    fontSize: 12,
    paddingHorizontal : 6,
    paddingVertical: 5,
    borderRadius: 2,
=======
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: "600",
>>>>>>> Stashed changes:src/components/InProgressOrder.js
    textAlign: "center",
    fontSize: 13,
  },
  
});

<<<<<<< Updated upstream:src/components/OrderList.js
export default OrderList; 
=======
export default InProgressOrder; 

>>>>>>> Stashed changes:src/components/InProgressOrder.js
