import React from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { GRAY_COLOR, WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, Green_Color } from "../res/colors";
import CustomButtom from "./CustomButtom";

const RBOrderSheet = ({ sheetRef, selectedOrder }) => {
  return (
    <RBSheet
      ref={sheetRef}
      height={450}
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
        <ScrollView style={styles.sheetContent}>
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
          <View style={styles.buttonContainer}>
            <Pressable style={styles.ScrollButton}>
              <Text style={styles.ScrollButtonText}>Scroll Down For Tracking</Text>
            </Pressable>
            <Text style={[styles.OrderIdText, { marginTop: 10 , marginBottom:0 }]}>{selectedOrder.orderId}</Text>
            </View>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineItem}>
              <View style={[styles.circle, styles.redCircle]} />
              <Text style={styles.statusText}>Order Confirmation</Text>
              <Text style={styles.statusDate}>{selectedOrder.deliveredOn}</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.circle, styles.redCircle]} />
              <Text style={styles.statusText}>In Preparation</Text>
              <Text style={styles.statusDate}>{selectedOrder.deliveredOn}</Text>
            </View>
            <View style={[styles.verticalLine, { borderColor: Green_Color }]} />
            <View style={styles.timelineItem}>
              <View style={[styles.circle, { backgroundColor: Green_Color }]} />
              <Text style={[styles.statusText, { color: Green_Color }]}>Ready To Dispatch</Text>
              <Text style={styles.statusDate}>{selectedOrder.deliveredOn}</Text>
            </View>
            <View style={[styles.verticalLine, { borderColor: GRAY_COLOR }]} />
            <View style={styles.timelineItem}>
              <View style={[styles.circle, { backgroundColor: GRAY_COLOR }]} />
              <Text style={[styles.statusText, { color: GRAY_COLOR }]}>On The Way</Text>
              <Text style={styles.statusDate}></Text>
            </View>
            <View style={[styles.verticalLine, { borderColor: GRAY_COLOR }]} />
            <View style={styles.timelineItem}>
              <View style={[styles.circle, { backgroundColor: GRAY_COLOR }]} />
              <Text style={[styles.statusText, { color: GRAY_COLOR }]}>Delivered</Text>
              <Text style={styles.statusDate}></Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButtom title={"Go Back"}
              width={'100%'}
              height={48}
              backgroundColor={THEME_COLOR}
              borderColor={THEME_COLOR}
              textStyle={{ color: WHITE_COLOR }} />
          </View>
        </ScrollView>
      )}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  sheetLabel: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
    // marginBottom: 8,
    fontWeight: "bold",
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
    marginBottom: 20,
    marginTop:20,
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
  timelineContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    marginRight: 8,
  },
  statusText: {
    flex: 1,
    fontSize: 15,
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  statusDate: {
    fontSize: 10,
    color: THEME_TEXT_COLOR,
  },
  verticalLine: {
    width: 2,
    height: 40,
    borderWidth: 1,
    borderColor: THEME_COLOR,
    alignSelf: "flex-start",
    marginLeft:10,
    marginBottom:10,
  },
  redCircle: {
    backgroundColor: "#EF4444",
  },
});

export default RBOrderSheet;
