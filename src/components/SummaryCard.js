import React from "react";
import { StyleSheet, Text, View, Animated, Easing, FlatList } from "react-native";
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

  // Combine all data for FlatList
  const renderData = [
    {
      type: 'header',
      title: `Items (${selectedItems.length})`,
      data: selectedItems
    },
    ...(selectedExtras.length > 0 ? [{
      type: 'header',
      title: `Extras (${selectedExtras.length})`,
      data: selectedExtras
    }] : []),
    {
      type: 'footer',
      subtotal: subtotal
    }
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>
            {item.title}
          </Text>
          {item.data.map((product, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={[styles.itemText, darkMode && styles.itemTextDark]}>
                {product.quantity}x {product.name}
              </Text>
              <Text style={styles.priceText}>
                Rs. {(product.price * product.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      );
    } else if (item.type === 'footer') {
      return (
        <View style={styles.totalSection}>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, darkMode && styles.totalLabelDark]}>
              Subtotal
            </Text>
            <Text style={styles.totalAmount}>Rs. {item.subtotal.toFixed(2)}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <Animated.View 
      style={[
        styles.summaryCard, 
        darkMode && styles.summaryCardDark,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
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
      
      <View style={{ height: 170 }}>
        <FlatList
          data={renderData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Checkout Button */}
      <View style={styles.checkoutButtonContainer}>
        <CustomButton
          title="Proceed to Checkout"
          textStyle={styles.checkoutText}
          buttonStyle={styles.checkoutButton}
          onPress={onCheckout}
          icon={<MaterialIcons name="arrow-forward" size={20} color={WHITE_COLOR} />}
          iconRight
        />
      </View>
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
  listContainer: {
    paddingBottom: 10,
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
  checkoutButtonContainer: {
    alignItems: "center",
  },
});

export default SummaryCard;