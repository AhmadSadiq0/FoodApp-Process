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
import RBSheet from "react-native-raw-bottom-sheet";

const InProgressOrder = ({ sections }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const sheetRef = useRef();

  const openSheet = (order) => {
    setSelectedOrder(order);
    sheetRef.current.open();
  };

  const renderOrderItem = ({ item }) => (
    <OrderCard order={item} onPress={() => openSheet(item)} />
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
      <RBSheet
        ref={sheetRef}
        height={400}
        draggable={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: WHITE_COLOR,
          },
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: GRAY_COLOR,
          },
        }}
        animationType="slide"
      >
        {selectedOrder && (
          <View style={styles.sheetContent}>
            <Text style={styles.OrderIdText}>Order Details</Text>
            <Text style={styles.sheetLabel}>
              Item(s): <Text style={styles.sheetValue}>1</Text>
            </Text>
            <Text style={styles.sheetLabel}>
              Details: <Text>{selectedOrder.itemName}</Text> (<Text style={styles.sheetValue}>1</Text>)
            </Text>
            <View style={styles.totalBillContainer}>
              <Text style={styles.sheetLabel}>
                Total Bill: <Text style={styles.sheetValue}>Rs. {selectedOrder.price}</Text>
              </Text>
            </View>
            {/* Add Button Below */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.ScrollButton}>
                <Text style={styles.ScrollButtonText}>Scroll Down For Tracking</Text>
              </Pressable>
              <View style={styles.buttonContainer}>
                <Text style={styles.OrderIdText}>{selectedOrder.orderId}</Text>
              </View>
            </View>
          </View>
        )}
      </RBSheet>
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
    color: THEME_TEXT_COLOR,
    fontWeight: "800",
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
    borderRadius: 9999,
    marginRight: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sheetLabel: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  sheetValue: {
    fontSize: 14,
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  totalBillContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  OrderIdText: {
    fontSize: 18,
    color: THEME_TEXT_COLOR,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center", 
  },
  ScrollButton: {
    backgroundColor: THEME_TEXT_COLOR,       
    height: 30,
    width: 225,
    borderRadius: 25,            
    justifyContent: "center",    
    alignItems: "center",         
  },
  ScrollButtonText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",         
  },
});

export default InProgressOrder;
