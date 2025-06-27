import React from "react";
import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import useThemeStore from "../../zustand/ThemeStore";
import {
  GRAY_COLOR,
  WHITE_COLOR,
  THEME_COLOR,
  Green_Color,
  DARK_BACKGROUND,
  RED_COLOR,
  BLACK_COLOR,
  DARK_GREEN,
  THEME_TEXT_COLOR,
  DARK_THEME_BACKGROUND,
} from "../res/colors";
import CustomButton from "./CustomButtom";
import Icon from "react-native-vector-icons/MaterialIcons";


const statusSequence = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled'
];

const statusConfig = {
  pending: {
    label: "Order Received",
    icon: "access-time",
    color: "#FFA500",
    activeIcon: "hourglass-empty"
  },
  confirmed: {
    label: "Order Confirmed",
    icon: "check-circle",
    color: THEME_COLOR,
    activeIcon: "check-circle-outline"
  },
  preparing: {
    label: "In Kitchen",
    icon: "restaurant",
    color: "#4A90E2",
    activeIcon: "restaurant-menu"
  },
  ready: {
    label: "Ready for Delivery",
    icon: "shopping-cart",
    color: DARK_GREEN,
    activeIcon: "local-shipping"
  },
  out_for_delivery: {
    label: "On the Way",
    icon: "delivery-dining",
    color: DARK_GREEN,
    activeIcon: "directions-bike"
  },
  delivered: {
    label: "Delivered",
    icon: "check-circle",
    color: Green_Color,
    activeIcon: "check-circle"
  },
  cancelled: {
    label: "Order Cancelled",
    icon: "cancel",
    color: RED_COLOR,
    activeIcon: "highlight-off"
  }
};

const RBOrderSheet = ({ sheetRef, selectedOrder }) => {
  const navigation = useNavigation();
  const { darkMode } = useThemeStore();

  const getStatusIndex = (status) =>
    Object.keys(statusConfig).indexOf(status);

  const dynamicStyles = {
    container: { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR },
    text: { color: darkMode ? WHITE_COLOR : "#2D3748" },
    label: { color: darkMode ? WHITE_COLOR : THEME_COLOR },
    card: { backgroundColor: darkMode ? DARK_BACKGROUND : "#F7FAFC" },
  };

  const renderTimelineStep = (status, index) => {
    const { label, icon, color, activeIcon } = statusConfig[status];
    const statusEntry = selectedOrder.statusHistory.find(s => s.status === status);
    const currentIndex = getStatusIndex(selectedOrder.status);
    const isCompleted = index <= currentIndex;
    const isCurrent = index === currentIndex;
    const isCancelled = selectedOrder.status === 'cancelled';

    // Don't show steps after cancellation
    if (isCancelled && index > currentIndex && status !== 'cancelled') return null;

    return (
      <React.Fragment key={status}>
        <View style={styles.timelineStep}>
          <View style={[
            styles.statusIconContainer,
            {
              backgroundColor: isCompleted ? color : dynamicStyles.card.backgroundColor,
              borderColor: isCompleted ? color : GRAY_COLOR
            }
          ]}>
            <Icon
              name={isCurrent ? activeIcon : icon}
              size={20}
              color={isCompleted ? WHITE_COLOR : GRAY_COLOR}
            />
          </View>
          <View style={styles.statusDetails}>
            <Text style={[
              styles.statusLabel,
              dynamicStyles.text,
              isCompleted && { color },
              isCancelled && status === 'cancelled' && { color: RED_COLOR }
            ]}>
              {label}
              {isCurrent && !isCancelled && (
                <Text style={styles.currentBadge}> • Now</Text>
              )}
            </Text>
            {statusEntry && (
              <Text
  style={[
    styles.statusTime,
    { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
  ]}
>
  {new Date(statusEntry.timestamp).toLocaleString()}
</Text>
            )}
          </View>
        </View>
        {index < statusSequence.length - 1 && !(isCancelled && index >= currentIndex) && (
          <View style={[
            styles.timelineConnector,
            {
              backgroundColor: isCompleted && !isCancelled ? color : dynamicStyles.card.backgroundColor,
              opacity: isCancelled ? 0.3 : 1
            }
          ]} />
        )}
      </React.Fragment>
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemCard, dynamicStyles.card]}>
      <Text style={[styles.itemName, dynamicStyles.text]}>{item.name}</Text>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemPrice, dynamicStyles.text]}>
          Rs. {item.totalPrice.toFixed(2)}
        </Text>
        <Text style={[styles.itemQuantity,{color : darkMode ? WHITE_COLOR : THEME_COLOR}]}>x{item.quantity}</Text>
      </View>
      {item.variant && (
        <Text style={[styles.itemVariant, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
  Variant: {item.variant.name}
</Text>
      )}
    </View>
  );

  const renderExtraItem = ({ item }) => (
    <View style={[styles.itemCard, dynamicStyles.card]}>
      <View style={styles.extraHeader}>
        <Text style={[styles.itemName, dynamicStyles.text]}>{item.name}</Text>
        <Text style={[styles.extraPrice, dynamicStyles.text]}>
          Rs. {(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.extraDetails}>
        <Text style={[styles.extraQuantity, { color: Green_Color}]}>
          {item.quantity} x Rs. {item.price.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <RBSheet
      ref={sheetRef}
      height={700}
      draggable={true}
      customStyles={{
        container: {
          ...dynamicStyles.container,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
           ...(darkMode && { 
                  borderTopWidth: 3,
                  borderLeftWidth: 3,
                  borderRightWidth: 3,
                  borderColor: THEME_COLOR, 
                }),
        },
        draggableIcon: { backgroundColor: GRAY_COLOR, width: 40 },
      }}
    >
      {selectedOrder && (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={[styles.orderId, dynamicStyles.text]}>
            Order #{selectedOrder.orderNumber}
          </Text>

          {/* Order Summary */}
          <View style={[styles.summaryCard, dynamicStyles.card]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.label]}>Order Date:</Text>
              <Text style={[styles.summaryValue, dynamicStyles.text]}>
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.label]}>Payment:</Text>
              <Text style={[styles.summaryValue, dynamicStyles.text]}>
                {selectedOrder.payment.method.toUpperCase()} - {selectedOrder.payment.status}
              </Text>
            </View>
            <View style={styles.summaryLastRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.label]}>Total Amount:</Text>
              <Text style={[styles.totalAmount, dynamicStyles.text]}>
                Rs. {selectedOrder.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Items List */}
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Order Items</Text>
          <FlatList
            data={selectedOrder.items}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />

          {selectedOrder.extras?.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, dynamicStyles.text]}>Extras</Text>
              <FlatList
                data={selectedOrder.extras}
                renderItem={renderExtraItem}
                keyExtractor={item => item._id}
                scrollEnabled={false}
              />
            </>
          )}

          {/* Status Timeline */}
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Order Journey</Text>
          <View style={styles.timelineContainer}>
            {Object.keys(statusConfig).map((status, index) =>
              renderTimelineStep(status, index)
            )}
          </View>

          <CustomButton
            title="Close Details"
            onPress={() => sheetRef.current.close()}
            style={styles.closeButton}
            textStyle={{ color: WHITE_COLOR }}
          />
        </ScrollView>
      )}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderId: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
  },
  itemCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  extraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  extraPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  extraQuantity: {
    fontSize: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemQuantity: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
  },
  itemVariant: {
    fontSize: 12,
    marginTop: 8,
    color: THEME_COLOR
  },
  statusIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
  },
  currentBadge: {
    fontSize: 12,
    color: GRAY_COLOR,
    fontWeight: '300',
  },
  timelineConnector: {
    width: 2,
    height: 40,
    marginLeft: 19,
    marginBottom: 8,
  },
  timelineContainer: {
    marginVertical: 16,
    paddingLeft: 24,
  },
  timelineStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDetails: {
    flex: 1,
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  statusTime: {
    fontSize: 12,
  },
  currentStatus: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  currentStatusText: {
    color: WHITE_COLOR,
    fontSize: 10,
    fontWeight: "500",
  },
  closeButton: {
    marginVertical: 30,
    backgroundColor: THEME_COLOR,
  },
});

export default RBOrderSheet;