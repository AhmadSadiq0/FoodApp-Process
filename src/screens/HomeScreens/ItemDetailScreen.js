import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BURGERIMG,
  ARROW_ICON,
  PLUS_ICON,
  VERIFIED_ICON,
  CHECKMARK_CIRCLE,
  BACK_ICON
} from "../../res/drawables";
import {
  THEME_COLOR,
  WHITE_COLOR,
  GRAY_COLOR,
  BLACK_COLOR,
  LIGHT_GRAY,
  SUCCESS_GREEN,
  DARK_GRAY
} from "../../res/colors";
import { CustomButton } from "../../components";
import useCartStore from "../../store/CartStore";
import useThemeStore from "../../../zustand/ThemeStore";
import { BlurView } from "@react-native-community/blur";
import LottieView from 'lottie-react-native';
import ImageButton from "../../components/ImageButton";

const { width } = Dimensions.get('window');

const ItemDetailScreen = ({ navigation, route }) => {
  const { addItem } = useCartStore();
  const { item } = route.params;
  const { name, description, image, variants = [] } = item;
  const { darkMode } = useThemeStore();
  const [selectedSize, setSelectedSize] = useState(variants[0]?.name || "Regular");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const successSheetRef = useRef();
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const getSelectedVariant = () => variants.find(v => v.name === selectedSize) || variants[0];

  const getAdjustedPrice = () => {
    const variant = getSelectedVariant();
    const toppingsPrice = selectedToppings.reduce((total, t) => total + t.price, 0);
    return variant ? (variant.price + toppingsPrice) * quantity : 0;
  };

  const handleSizeSelection = (size) => setSelectedSize(size);

  const handleIncrement = () => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => opacity.setValue(0));
    setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => opacity.setValue(0));
      setQuantity(q => q - 1);
    }
  };

  const toggleTopping = (topping) => {
    setSelectedToppings(prev =>
      prev.some(t => t.name === topping.name)
        ? prev.filter(t => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const animateCheckmark = () => {
    Animated.sequence([
      Animated.spring(checkmarkScale, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(checkmarkScale, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleAddCart = async () => {
    //setIsAddingToCart(true);

    // Simulate API call
    //await new Promise(resolve => setTimeout(resolve, 1500));

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

    setIsAddingToCart(false);
    successSheetRef.current.open();
    animateCheckmark();
  };

  const renderSpecificationsTable = () => {
    const variant = getSelectedVariant();
    if (!variant?.specifications?.length) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
          Nutritional Information
        </Text>
        <View style={[styles.table, {
          borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
          backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9'
        }]}>
          {variant.specifications.map((spec, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 && {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#f9f9f9'
                },
                index === variant.specifications.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={[styles.tableCell, styles.tableCellLeft, { color: darkMode ? WHITE_COLOR : DARK_GRAY }]}>
                {spec.key}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellRight, { color: darkMode ? WHITE_COLOR : DARK_GRAY }]}>
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
          Customize Your {name}
        </Text>
        <Text style={[styles.sectionSubtitle, { color: darkMode ? GRAY_COLOR : '#666' }]}>
          Select your preferred toppings (optional)
        </Text>
        <View style={styles.toppingsContainer}>
          {variant.toppings.map((topping, index) => {
            const isSelected = selectedToppings.some(t => t.name === topping.name);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.toppingCard,
                  isSelected && {
                    borderColor: THEME_COLOR,
                    backgroundColor: darkMode ? 'rgba(56, 182, 255, 0.1)' : 'rgba(56, 182, 255, 0.05)'
                  },
                  {
                    borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
                    backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : WHITE_COLOR
                  }
                ]}
                onPress={() => toggleTopping(topping)}
              >
                <View style={styles.toppingInfo}>
                  <Text style={[
                    styles.toppingName,
                    {
                      color: isSelected ? THEME_COLOR : (darkMode ? WHITE_COLOR : BLACK_COLOR),
                      fontWeight: isSelected ? '600' : '400'
                    }
                  ]}>
                    {topping.name}
                  </Text>
                  <Text style={[
                    styles.toppingPrice,
                    {
                      color: isSelected ? THEME_COLOR : (darkMode ? GRAY_COLOR : '#666'),
                    }
                  ]}>
                    {`+ Rs. ${topping.price}`}
                  </Text>
                </View>
                <View style={[
                  styles.checkbox,
                  isSelected && { backgroundColor: THEME_COLOR, borderColor: THEME_COLOR },
                  { borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY }
                ]}>
                  {isSelected && (
                    <Image
                      source={VERIFIED_ICON}
                      style={styles.checkboxIcon}
                    />
                  )}
                </View>
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
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image with Back Button */}
        <View style={styles.imageContainer}>
          <Image
            source={image ? { uri: image } : BURGERIMG}
            style={styles.image}
            resizeMode="cover"
          />
          <ImageButton
            imageSource={BACK_ICON}
            onPress={() => navigation.goBack()}
            buttonStyle={styles.backButton}
          />
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
              {name}
            </Text>
            <Text style={[styles.price, { color: THEME_COLOR }]}>
              Rs. {getSelectedVariant()?.price || 0}
            </Text>
          </View>

          <Text style={[styles.description, { color: darkMode ? GRAY_COLOR : '#666' }]}>
            {description}
          </Text>

          {/* Size Options */}
          {variants?.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
                Select Size
              </Text>
              <View style={styles.sizeContainer}>
                {variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.name}
                    style={[
                      styles.sizeOption,
                      selectedSize === variant.name && {
                        backgroundColor: THEME_COLOR,
                        borderColor: THEME_COLOR
                      },
                      {
                        borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : WHITE_COLOR
                      }
                    ]}
                    onPress={() => handleSizeSelection(variant.name)}
                  >
                    <Text style={[
                      styles.sizeLabel,
                      selectedSize === variant.name && { color: WHITE_COLOR },
                      { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
                    ]}>
                      {variant.name}
                    </Text>
                    <Text style={[
                      styles.sizePrice,
                      selectedSize === variant.name && { color: WHITE_COLOR },
                      { color: darkMode ? GRAY_COLOR : '#666' }
                    ]}>
                      Rs. {variant.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {renderSpecificationsTable()}
          {renderToppingsSection()}

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
              Quantity
            </Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={[styles.quantityButton, {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
                  borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
                }]}
              >
                <Text style={[styles.quantityButtonText, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>-</Text>
              </TouchableOpacity>
              <Animated.View style={{ opacity }}>
                <Text style={[styles.quantityValue, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
                  {quantity}
                </Text>
              </Animated.View>
              <TouchableOpacity
                onPress={handleIncrement}
                style={[styles.quantityButton, {
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
                  borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
                }]}
              >
                <Text style={[styles.quantityButtonText, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={[styles.footer, {
        backgroundColor: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
        borderTopColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
      }]}>
        <View style={styles.priceSummary}>
          <Text style={[styles.totalLabel, { color: darkMode ? WHITE_COLOR : '#666' }]}>
            Total
          </Text>
          <Text style={[styles.totalPrice, { color: THEME_COLOR }]}>
            Rs. {getAdjustedPrice()}
          </Text>
        </View>
        <CustomButton
          title="Add to Cart"
          onPress={handleAddCart}
          loading={isAddingToCart}
          style={styles.addToCartButton}
          textStyle={styles.addToCartText}
        />
      </View>

      {/* Success Bottom Sheet */}
      <RBSheet
        ref={successSheetRef}
        height={300}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: [
            styles.successSheet,
            {
              backgroundColor: darkMode ? '#1a1a1a' : WHITE_COLOR,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24
            }
          ],
          draggableIcon: {
            backgroundColor: darkMode ? GRAY_COLOR : LIGHT_GRAY,
            width: 60,
            height: 5,
            borderRadius: 3
          }
        }}
      >
        <View style={styles.successContent}>
          <Animated.View style={[styles.checkmarkContainer, { transform: [{ scale: checkmarkScale }] }]}>
            <LottieView
              source={require('../../res/animations/checkmark-animation.json')}
              autoPlay
              loop={false}
              style={styles.lottieCheckmark}
            />
          </Animated.View>
          <Text style={[styles.successTitle, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
            Added to Your Cart!
          </Text>
          <Text style={[styles.successMessage, { color: darkMode ? GRAY_COLOR : '#666' }]}>
            {name} has been added to your shopping cart
          </Text>
          <CustomButton
            title="View Cart"
            onPress={() => {
              successSheetRef.current.close();
              navigation.navigate('Cart');
            }}
            style={styles.viewCartButton}
            textStyle={styles.viewCartText}
            outline
          />
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed footer
  },
  imageContainer: {
    height: width * 0.8,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    fontFamily: 'SFProDisplay-Bold',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Bold',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: 'SFProText-Regular',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'SFProDisplay-Semibold',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'SFProText-Regular',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  sizeOption: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'SFProText-Semibold',
  },
  sizePrice: {
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  },
  table: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  tableCell: {
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  },
  tableCellLeft: {
    flex: 1,
  },
  tableCellRight: {
    width: 100,
    textAlign: 'right',
  },
  toppingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  toppingCard: {
    width: '100%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toppingInfo: {
    flex: 1,
  },
  toppingName: {
    fontSize: 15,
    marginBottom: 4,
    fontFamily: 'SFProText-Medium',
  },
  toppingPrice: {
    fontSize: 14,
    fontFamily: 'SFProText-Regular',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxIcon: {
    width: 14,
    height: 14,
    tintColor: WHITE_COLOR,
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    maxWidth: 180,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
    fontFamily: 'SFProText-Semibold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceSummary: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'SFProText-Regular',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'SFProDisplay-Bold',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 16,
    maxWidth: 180,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SFProText-Semibold',
  },
  successSheet: {
    alignItems: 'center',
    padding: 24,
  },
  successContent: {
    alignItems: 'center',
    width: '100%',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  lottieCheckmark: {
    width: "100%",
    height: "100%",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'SFProDisplay-Semibold',
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'SFProText-Regular',
    lineHeight: 22,
  },
  viewCartButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  viewCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: WHITE_COLOR,
    fontFamily: 'SFProText-Semibold',
  },
});

export default ItemDetailScreen;