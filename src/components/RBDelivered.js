import React, { useState } from "react";
import { 
  ScrollView,
  StyleSheet, 
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
//Navigation
import { useNavigation } from "@react-navigation/native";
//RawBottomSheet
import RBSheet from "react-native-raw-bottom-sheet";
//Colors
import { 
  GRAY_COLOR,
  WHITE_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  BLACK_COLOR,
  Back_Ground,
  DARK_THEME_BACKGROUND,
  DARK_THEME_TEXT_COLOR,
} from "../res/colors";
//CustomButton
import CustomButton from "./CustomButtom";
//State Manage
import useThemeStore from "../../zustand/ThemeStore";

const RBDelivered = ({ sheetRef, selectedOrder }) => {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const { darkMode } = useThemeStore();

  const navigateToMenu = () => {
    sheetRef.current.close();
    navigation.navigate("Menu");
  };
  
  const goBack = () => {
    sheetRef.current.close();
    navigation.goBack();
  };

  const dynamicStyles = {
    container: {
      backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
    },
    text: {
      color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR, 
    },
    label: {
      color: darkMode ? DARK_THEME_TEXT_COLOR : THEME_COLOR, 
    },
    button: {
      backgroundColor: darkMode ? BLACK_COLOR : THEME_COLOR,
      borderColor: darkMode ? BLACK_COLOR : THEME_COLOR,
    },
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={450}
      draggable={true}
      customStyles={{
        container: {
          ...dynamicStyles.container,
         ...(darkMode && { // Only apply these borders when darkMode is true
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: THEME_COLOR, // Use white border in dark mode
      }),
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
          <View style={styles.orderDetails}>
            <Text style={[styles.orderIdText, dynamicStyles.text]}>
              {selectedOrder.orderId}
            </Text>
            <Text style={[styles.sheetLabel, dynamicStyles.label]}>
              Delivered By:{" "}
              <Text style={[styles.deliveredByValue, dynamicStyles.text]}>
                {selectedOrder.deliveredBy}
              </Text>
            </Text>
            <Text style={[styles.sheetValue, dynamicStyles.label]}>
              Order Details:{" "}
              <Text style={[styles.deliveredByValue, dynamicStyles.text]}>
                {selectedOrder.orderDetails}
              </Text>
            </Text>
            <Text style={[styles.sheetLabel, dynamicStyles.label]}>
              Delivered On:{" "}
              <Text style={[styles.deliveredByValue, dynamicStyles.text]}>
                {selectedOrder.deliveredOn}
              </Text>
            </Text>
          </View>
          <Text style={[styles.orderIdText, dynamicStyles.text]}>
            Rate Our Service
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Pressable key={i} onPress={() => setRating(i + 1)}>
                  <Text
                    style={
                      i < rating
                        ? [styles.starFilled, dynamicStyles.label]
                        : [styles.starEmpty, dynamicStyles.text]
                    }
                  >
                    ★
                  </Text>
                </Pressable>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.submitButton, dynamicStyles.button]}
              onPress={() => console.log("Rating Submitted:", rating)}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonsContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton
                title={"Re-Order"}
                width={"100%"}
                height={48}
                backgroundColor={darkMode ? BLACK_COLOR : Back_Ground}
                borderColor={THEME_COLOR}
                textStyle={{ color: WHITE_COLOR }}
                onPress={navigateToMenu}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title={"Go Back"}
                width={"100%"}
                height={48}
                backgroundColor={dynamicStyles.button.backgroundColor}
                borderColor={dynamicStyles.button.borderColor}
                textStyle={{ color: WHITE_COLOR }}
                onPress={goBack}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  sheetLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "700",
  },
  deliveredByValue: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "400",
  },
  sheetValue: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderDetails: {
    marginVertical: 5,
  },
  orderIdText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    borderRadius: 37,
    height: 48,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginVertical: 25,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  starFilled: {
    fontSize: 20,
    marginHorizontal: 4,
  },
  starEmpty: {
    fontSize: 20,
    marginHorizontal: 4,
  },
  submitButton: {
    height: 30,
    width: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    lineHeight: 30,
    fontSize: 15,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  ButtonsContainer: {
    justifyContent: "flex-end",
  },
});
export default RBDelivered;
