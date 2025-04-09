import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { BURGERIMG, ARROW_ICON, PLUS_ICON, VERIFIED_ICON, IMAGE29 } from "../../res/drawables";
import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, BLACK_COLOR, LIGHT_GRAY } from "../../res/colors";
import CustomButton from "../../components/CustomButtom";
import useCartStore from "../../store/CartStore";
import useThemeStore from "../../../zustand/ThemeStore";

const ItemDetailScreen = ({ navigation, route }) => {
  const { addItem } = useCartStore();
  const { item } = route.params;
  const { name, description, image, variants = [] } = item;  
  const { darkMode } = useThemeStore();
  const [selectedSize, setSelectedSize] = useState(variants[0]?.name || "Regular");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const successSheetRef = useRef();

  const getSelectedVariant = () => variants.find(v => v.name === selectedSize) || variants[0];
  
  const getAdjustedPrice = () => {
    const variant = getSelectedVariant();
    const toppingsPrice = selectedToppings.reduce((total, t) => total + t.price, 0);
    return variant ? (variant.price + toppingsPrice) * quantity : 0;
  };

  const handleSizeSelection = (size) => setSelectedSize(size);
  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(q => q - 1);

  const toggleTopping = (topping) => {
    setSelectedToppings(prev => 
      prev.some(t => t.name === topping.name) 
        ? prev.filter(t => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const handleAddCart = () => {
    const variant = getSelectedVariant();
    addItem({ 
      name,
      description,
      image,
      price: getAdjustedPrice(),
      size: variant.name,
      quantity,
      toppings: selectedToppings,
      specifications: variant.specifications,
      serving: `${variant.name} size`, 
      id: `${name}-${variant.name}-${Date.now()}`,
    });
    successSheetRef.current.open();
    setTimeout(() => successSheetRef.current.close(), 1500);
  };

  const renderSpecificationsTable = () => {
    const variant = getSelectedVariant();
    if (!variant?.specifications?.length) return null;
    
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
          Specification
        </Text>
        <View style={[styles.table, { borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY }]}>
          {variant.specifications.map((spec, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                index % 2 === 0 && { backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9' }
              ]}
            >
              <Text style={[styles.tableCell, styles.tableCellLeft, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                {spec.key}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellRight, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                {spec.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderToppingsSection = () => {
    const variant = getSelectedVariant();
    if (!variant?.toppings?.length) return null;
    
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
          Toppings
        </Text>
        <View style={[styles.table, { 
          borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
          backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f9f9f9'
        }]}>
          {variant.toppings.map((topping, index) => {
            const isSelected = selectedToppings.some(t => t.name === topping.name);
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.tableRow,
                  isSelected && { backgroundColor: THEME_COLOR },
                  { 
                    borderBottomColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
                    borderBottomWidth: index < variant.toppings.length - 1 ? 1 : 0
                  }
                ]}
                onPress={() => toggleTopping(topping)}
              >
                <Text style={[
                  styles.tableCell, 
                  styles.tableCellLeft, 
                  { 
                    color: isSelected ? WHITE_COLOR : (darkMode ? WHITE_COLOR : BLACK_COLOR),
                    fontWeight: isSelected ? '600' : '400'
                  }
                ]}>
                  {topping.name}
                </Text>
                <Text style={[
                  styles.tableCell, 
                  styles.tableCellRight, 
                  { 
                    color: isSelected ? WHITE_COLOR : (darkMode ? WHITE_COLOR : BLACK_COLOR),
                    fontWeight: isSelected ? '600' : '400'
                  }
                ]}>
                  {`Rs. ${topping.price}`}
                </Text>
                <Image 
                  source={isSelected ? VERIFIED_ICON : PLUS_ICON}
                  style={[styles.plusIcon, { tintColor: isSelected ? WHITE_COLOR : THEME_COLOR }]} 
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <>
      <ScrollView 
        style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[styles.arrowIconContainer, ]}
          >
            <Image 
              source={ARROW_ICON} 
              style={[styles.arrowIcon, { tintColor: darkMode ? WHITE_COLOR : THEME_COLOR }]} 
            />
          </TouchableOpacity>

          <Image 
            source={image ? { uri: image } : BURGERIMG} 
            style={styles.image} 
            resizeMode="contain"
          />

          <View style={styles.headerText}>
            <Text style={[styles.name, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
              {name}
            </Text>
            <Text style={[styles.priceText, { color: THEME_COLOR }]}>
              Rs. {getSelectedVariant()?.price || 0}
            </Text>
          </View>

          <Text style={[styles.description, { color: darkMode ? GRAY_COLOR : '#666' }]}>
            {description}
          </Text>

          {variants?.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
                Size Options
              </Text>
              <View style={styles.sizeContainer}>
                {variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.name}
                    style={[
                      styles.sizeButton,
                      selectedSize === variant.name && { 
                        backgroundColor: THEME_COLOR,
                        borderColor: THEME_COLOR 
                      },
                      { borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY }
                    ]}
                    onPress={() => handleSizeSelection(variant.name)}
                  >
                    <Text style={[
                      styles.sizeButtonText,
                      selectedSize === variant.name && { color: WHITE_COLOR },
                      { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
                    ]}>
                      {variant.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {renderSpecificationsTable()}
          {renderToppingsSection()}
          
          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityLabel, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
              Quantity
            </Text>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity 
                onPress={handleDecrement} 
                style={[styles.quantityButton, { backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }]}
              >
                <Text style={[styles.quantityButtonText, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.quantityText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                {quantity}
              </Text>
              <TouchableOpacity 
                onPress={handleIncrement} 
                style={[styles.quantityButton, { backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0' }]}
              >
                <Text style={[styles.quantityButtonText, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={[styles.priceLabel, { color: darkMode ? WHITE_COLOR : '#666' }]}>
                Total Price:
              </Text>
              <Text style={[styles.price, { color: THEME_COLOR }]}>
                {`Rs. ${getAdjustedPrice()}`}
              </Text>
            </View>
            <CustomButton
              title="Add to Cart"
              onPress={handleAddCart}
              style={styles.addToCartButton}
              textStyle={styles.addToCartText}
            />
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={successSheetRef}
        height={150}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: [
            styles.successSheet,
            { 
              backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20
            }
          ],
          draggableIcon: { 
            backgroundColor: THEME_COLOR,
            width: 40
          }
        }}
      >
        <View style={styles.successContent}>
          <Image source={IMAGE29} style={styles.successIcon} />
          <Text style={[styles.successText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
            Item Added to Cart
          </Text>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
  },
  card: {
    padding: 20,
  },
  arrowIconContainer: {
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
  },
  arrowIcon: {
    width: 35,
    height: 35,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  table: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  tableCell: {
    fontSize: 14,
  },
  tableCellLeft: {
    flex: 1,
  },
  tableCellRight: {
    width: 80,
    textAlign: 'right',
  },
  plusIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  addToCartButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingVertical: 14,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
  },
  successSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
  },
  successIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ItemDetailScreen;