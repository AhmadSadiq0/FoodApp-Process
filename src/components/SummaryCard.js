import React from "react";
import { StyleSheet, Text, View, Animated, Easing, ScrollView } from "react-native";
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";
import CustomButton from "./CustomButtom";
import { MaterialIcons } from "@expo/vector-icons";

const SummaryCard = ({ selectedItems, selectedExtras, subtotal, onCheckout }) => {
  const { darkMode } = useThemeStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;


  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.summaryCard, 
        darkMode && styles.summaryCardDark,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}
    >
      <View style={styles.header}>
        <MaterialIcons 
          name="shopping-cart" 
          size={28} 
          color={darkMode ? WHITE_COLOR : THEME_COLOR} 
        />
        <Text style={[styles.headerText, darkMode && styles.headerTextDark]}>
          Order Summary
        </Text>
      </View>
      <View style={{ height: 320 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Items Breakdown */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>
          Items ({selectedItems.length})
        </Text>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={[styles.itemText, darkMode && styles.itemTextDark]}>
              {item.quantity}x {item.name}
            </Text>
            <Text style={styles.priceText}>
              Rs. {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Extras Breakdown */}
      {selectedExtras.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>
            Extras ({selectedExtras.length})
          </Text>
          {selectedExtras.map((extra, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.itemText, darkMode && styles.itemTextDark]}>
                {extra.quantity}x {extra.name}
              </Text>
              <Text style={styles.priceText}>
                Rs. {(extra.price * extra.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Total Section */}
      <View style={styles.totalSection}>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, darkMode && styles.totalLabelDark]}>
            Subtotal
          </Text>
          <Text style={styles.totalAmount}>Rs. {subtotal.toFixed(2)}</Text>
        </View>
      </View>
      </ScrollView>
      </View>

      {/* Checkout Button */}
      <CustomButton
        title="Proceed to Checkout"
        textStyle={styles.checkoutText}
        buttonStyle={styles.checkoutButton}
        onPress={onCheckout}
        icon={<MaterialIcons name="arrow-forward" size={20} color={WHITE_COLOR} />}
        iconRight
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    padding: 24,
    width: "100%",
    backgroundColor: WHITE_COLOR,
  },
  summaryCardDark: {
    backgroundColor: "#1E1E1E",
    shadowColor: "#444",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: THEME_TEXT_COLOR,
    marginLeft: 12,
  },
  headerTextDark: {
    color: WHITE_COLOR,
  },
  section: {
    marginBottom: 16,
  },
  scrollContainer : {

  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME_TEXT_COLOR,
    marginBottom: 12,
  },
  sectionTitleDark: {
    color: WHITE_COLOR,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
  },
  itemText: {
    fontSize: 15,
    color: "#555",
  },
  itemTextDark: {
    color: "#DDD",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "600",
    color: THEME_COLOR,
  },
  totalSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME_TEXT_COLOR,
  },
  totalLabelDark: {
    color: WHITE_COLOR,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: THEME_COLOR,
  },
  checkoutButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    width: "100%",
  },
  checkoutText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SummaryCard;