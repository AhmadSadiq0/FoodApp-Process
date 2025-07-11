import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { BURGERIMG, BACK_ICON } from "../../res/drawables";
import {
  THEME_COLOR,
  WHITE_COLOR,
  GRAY_COLOR,
  INPUT_BACK_COLOR,
  BLACK_COLOR,
  LIGHT_GRAY,
  THEME_TEXT_COLOR,
  DARK_THEME_BACKGROUND,
  LIGHT_THEME_BACKGROUND,
  LIGHT_THEME_COLOR
} from "../../res/colors";
import QuantitySelector from "../../components/QuantitySelector";
import useExtraStore from "../../store/ExtrasStore";
import { CustomButton } from "../../components";
import useCartStore from "../../store/CartStore";
import useThemeStore from "../../../zustand/ThemeStore";
import LottieView from 'lottie-react-native';
import ImageButton from "../../components/ImageButton";
import useBranchStore from "../../store/BranchStore";
import NutritionRow from "../../components/NutritionalRaw";
import ToppingItem from "../../components/ToppingItem";
import ExtrasItem from "../../components/ExtrasItem";

const ItemDetailScreen = ({ navigation, route }) => {
  // State and store hooks
  const { addItem } = useCartStore();
  const { item } = route.params;
  const { name, description, image, variants = [] } = item;
  const { darkMode } = useThemeStore();
  const [selectedSize, setSelectedSize] = useState(variants[0]?.name || "Regular");
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { fetchExtrasByBranch, extras } = useExtraStore();
  const { selectedBranch } = useBranchStore();
  const successSheetRef = useRef();
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const {
    selectedExtras,
    toggleExtra,
    updateExtraQuantity,
    clearSelectedExtras
  } = useExtraStore();

  useEffect(() => {
    if (selectedBranch) {
      fetchExtrasByBranch(selectedBranch._id);
    }
  }, [selectedBranch]);

  useEffect(() => {
    console.log('Selected Extras Updated:', selectedExtras);
  }, [selectedExtras]);

  useEffect(() => {
    clearSelectedExtras();
  }, []);

  const handleViewCart = () => {
    successSheetRef.current.close();
    navigation.navigate('Main', {
      screen: 'Cart',
      params: {
        screen: 'Cart'
      }
    });
  };

  const getSelectedVariant = () => variants.find(v => v.name === selectedSize) || variants[0];
  const getAdjustedPrice = () => {
    const variant = getSelectedVariant();
    const toppingsPrice = selectedToppings.reduce((total, t) => total + t.price, 0);
    const extrasPrice = selectedExtras.reduce((total, e) => total + (e.price * e.quantity), 0);

    return variant ? ((variant.price + toppingsPrice + extrasPrice) * quantity).toFixed(2) : 0;
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
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
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const variant = getSelectedVariant();
    addItem({
      name,
      description,
      image,
      price: getAdjustedPrice(),
      size: variant.name,
      variant: getSelectedVariant(),
      quantity,
      toppings: selectedToppings,
      extras: selectedExtras.map(extra => ({
        ...extra,
        quantity: extra.quantity || 1
      })),
      categoryId: item.categoryId._id,
      categoryName: item.categoryName,
      specifications: variant.specifications,
      serving: `${variant.name} size`,
      itemId: item._id,
    });
    setIsAddingToCart(false);
    successSheetRef.current.open();
    animateCheckmark();
    clearSelectedExtras()
  };

  const renderSpecificationsTable = () => {
    const variant = getSelectedVariant();
    if (!variant?.specifications?.length) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
            Specifications
          </Text>
        </View>
        <View style={[
          styles.nutritionContainer,
          {
            backgroundColor: darkMode ? DARK_THEME_BACKGROUND : INPUT_BACK_COLOR,
            borderColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
          }
        ]}>
          {variant.specifications.map((spec, index) => (
            <NutritionRow
              key={index}
              label={spec.key}
              value={spec.value}
              darkMode={darkMode}
              isLast={index === variant.specifications.length - 1}
            />
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
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
            Topping on {name}
          </Text>
        </View>
        <Text style={[styles.sectionSubtitle, { color: darkMode ? GRAY_COLOR : THEME_TEXT_COLOR }]}>
          Select your preferred toppings (optional)
        </Text>
        <View style={styles.toppingsGrid}>
          {variant.toppings.map((topping, index) => (
            <ToppingItem
              key={index}
              topping={topping}
              isSelected={selectedToppings.some(t => t.name === topping.name)}
              darkMode={darkMode}
              onToggle={() => toggleTopping(topping)}
            />
          ))}
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
        <View style={styles.imageContainer}>
          <Image
            source={image ? { uri: image } : BURGERIMG}
            style={styles.image}
            resizeMode="cover"
          />
          <ImageButton
            imageSource={BACK_ICON}
            onPress={() => navigation.goBack()}
            buttonStyle={[
              styles.backButton,
              { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }
            ]}
            imageStyle={{ tintColor: THEME_COLOR }}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
              {name}
            </Text>
            <Text style={[styles.price, { color: THEME_COLOR }]}>
              Rs. {getSelectedVariant()?.price || 0}
            </Text>
          </View>
          <Text style={[styles.description, { color: darkMode ? GRAY_COLOR : THEME_TEXT_COLOR }]}>
            {description}
          </Text>

          {variants?.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
                  Select Size
                </Text>
              </View>
              <View style={styles.sizeContainer}>
                {variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.name}
                    style={[
                      styles.sizeOption,
                      selectedSize === variant.name && styles.sizeOptionSelected,
                      {
                        backgroundColor: selectedSize === variant.name
                          ? THEME_COLOR
                          : (darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR),
                        borderColor: selectedSize === variant.name
                          ? THEME_COLOR
                          : (darkMode ? GRAY_COLOR : LIGHT_GRAY)
                      }
                    ]}
                    onPress={() => handleSizeSelection(variant.name)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.sizeLabel,
                      {
                        color: selectedSize === variant.name ? WHITE_COLOR : (darkMode ? WHITE_COLOR : BLACK_COLOR)
                      }
                    ]}>
                      {variant.name}
                    </Text>
                    <Text style={[
                      styles.sizePrice,
                      {
                        color: selectedSize === variant.name ? WHITE_COLOR : (darkMode ? GRAY_COLOR : THEME_TEXT_COLOR)
                      }
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
          <ExtrasItem
            extras={extras}
            darkMode={darkMode}
          />
        </View>
      </ScrollView>
      <View style={[styles.footer, {
        backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR,
        borderTopColor: darkMode ? GRAY_COLOR : LIGHT_GRAY
      }]}>
        <View style={styles.footerContent}>
          <View style = {{flex : 1, flexDirection : 'column' , gap : 10}}>

          <View style={styles.priceSummary}>
            <Text style={[styles.totalPrice, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>
              Total Rs. {getAdjustedPrice()}
            </Text>
          </View>
           <QuantitySelector
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            darkMode={darkMode}
          />
          </View>

          <CustomButton
            title="Add to Cart"
            onPress={handleAddCart}
            style={styles.addToCartButton}
            textStyle={styles.addToCartText}
          />
        </View>
      </View>

      <RBSheet
        ref={successSheetRef}
        height={300}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: [
            styles.successSheet,
            {
              backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              ...(darkMode && {
                borderTopWidth: 3,
                borderLeftWidth: 3,
                borderRightWidth: 3,
                borderColor: THEME_COLOR,
              }),
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
          <Text style={[styles.successTitle, { color: darkMode ? WHITE_COLOR : DARK_THEME_BACKGROUND }]}>
            Added to Your Cart!
          </Text>
          <Text style={[styles.successMessage, { color: darkMode ? GRAY_COLOR : THEME_TEXT_COLOR }]}>
            {name} has been added to your shopping cart
          </Text>
          <CustomButton
            title="View Cart"
            onPress={handleViewCart}
            style={styles.viewCartButton}
            textStyle={styles.viewCartText}
            outline
          />
        </View>
      </RBSheet>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 13,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    width: '100%',
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  sizeOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    minWidth: 100,
    backgroundColor: THEME_COLOR,
  },
  sizeOptionSelected: {
    borderColor: THEME_COLOR,
  },
  sizeLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  sizePrice: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 3,
  },

  toppingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceSummary: {
    flex: 1
  },
  totalLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf : 'flex-start'
  },
  addToCartButton: {
    flex: 1,
    maxWidth: 150,
  },
  addToCartText: {
    fontSize: 14,
  },
  successSheet: {
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
    padding: 10,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  lottieCheckmark: {
    width: '100%',
    height: '100%',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  viewCartButton: {
    width: '100%',
    marginTop: 10,
  },
  viewCartText: {
    fontSize: 14,
  },

});

export default ItemDetailScreen; 