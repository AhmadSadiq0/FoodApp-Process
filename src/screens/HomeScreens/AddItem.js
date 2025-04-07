// import React, { useState, useRef } from "react";
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
// // Images
// import { BURGERIMG, ARROW_ICON, PLUS_ICON, VERIFIED_ICON, IMAGE29 } from "../../res/drawables";
// // Colors
// import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, BLACK_COLOR } from "../../res/colors";
// // Components
// import CustomButton from "../../components/CustomButtom";
// // Stores
// import useCartStore from "../../store/CartStore";
// import useThemeStore from "../../../zustand/ThemeStore";

// const AddItem = ({ navigation, route }) => {
//   const { addItem } = useCartStore();
//   const { item } = route.params;
//   const { name, description, image, variants = [] } = item;  
//   const { darkMode } = useThemeStore();
//   const [selectedSize, setSelectedSize] = useState(variants[0]?.name || "Regular");
//   const [quantity, setQuantity] = useState(1);
//   const [selectedToppings, setSelectedToppings] = useState([]);
//   const successSheetRef = useRef();

//   const getSelectedVariant = () => variants.find(v => v.name === selectedSize) || variants[0];
  
//   const getAdjustedPrice = () => {
//     const variant = getSelectedVariant();
//     const toppingsPrice = selectedToppings.reduce((total, t) => total + t.price, 0);
//     return variant ? (variant.price + toppingsPrice) * quantity : 0;
//   };

//   const handleSizeSelection = (size) => setSelectedSize(size);
  
//   const handleIncrement = () => setQuantity(q => q + 1);
  
//   const handleDecrement = () => quantity > 1 && setQuantity(q => q - 1);

//   const toggleTopping = (topping) => {
//     setSelectedToppings(prev => 
//       prev.some(t => t.name === topping.name) 
//         ? prev.filter(t => t.name !== topping.name)
//         : [...prev, topping]
//     );
//   };

//   const handleAddCart = () => {
//     const variant = getSelectedVariant();
//     addItem({ 
//       name,
//       description,
//       image,
//       price: getAdjustedPrice(),
//       size: variant.name,
//       quantity,
//       toppings: selectedToppings,
//       specifications: variant.specifications,
//       serving: `${variant.name} size`, 
//       id: `${name}-${variant.name}-${Date.now()}`,
//     });
//     successSheetRef.current.open();
//     setTimeout(() => successSheetRef.current.close(), 1500);
//   };

//   const renderSpecificationsTable = () => {
//     const variant = getSelectedVariant();
//     if (!variant?.specifications?.length) return null;
    
//     return (
//       <View style={styles.section}>
//         <Text style={[styles.sectionTitle, { color: THEME_COLOR }]}>Specification</Text>
//         <View style={styles.table}>
//           {variant.specifications.map((spec, index) => (
//             <View key={index} style={styles.tableRow}>
//               <Text style={[styles.tableCell, styles.tableCellLeft, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
//                 {spec.key}
//               </Text>
//               <Text style={[styles.tableCell, styles.tableCellRight, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
//                 {spec.value}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     );
//   };

//   const renderToppingsSection = () => {
//     const variant = getSelectedVariant();
//     if (!variant?.toppings?.length) return null;
    
//     return (
//       <View style={styles.section}>
//         <Text style={[styles.sectionTitle, { color: THEME_COLOR }]}>Toppings</Text>
//         <View style={styles.table}>
//           {variant.toppings.map((topping, index) => {
//             const isSelected = selectedToppings.some(t => t.name === topping.name);
//             return (
//               <TouchableOpacity 
//                 key={index} 
//                 style={[styles.tableRow, isSelected && { backgroundColor: THEME_COLOR }]}
//                 onPress={() => toggleTopping(topping)}
//               >
//                 <Text style={[styles.tableCell, styles.tableCellLeft, isSelected && { color: WHITE_COLOR }]}>
//                   {topping.name}
//                 </Text>
//                 <Text style={[styles.tableCell, styles.tableCellRight, isSelected && { color: WHITE_COLOR }]}>
//                   {`Rs. ${topping.price}`}
//                 </Text>
//                 <Image 
//                   source={isSelected ? VERIFIED_ICON : PLUS_ICON}
//                   style={[styles.plusIcon, { tintColor: isSelected ? 'white' : THEME_COLOR }]} 
//                 />
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//     );
//   };
  
//   return (
//     <>
//       <ScrollView 
//         style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.card}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowIconContainer}>
//             <Image 
//               source={ARROW_ICON} 
//               style={[styles.arrowIcon, { tintColor: darkMode ? WHITE_COLOR : THEME_COLOR }]} 
//             />
//           </TouchableOpacity>

//           <Image source={image ? { uri: image } : BURGERIMG} style={styles.image} />

//           <Text style={[styles.name, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
//             {name}
//           </Text>

//           <Text style={[styles.description, { color: THEME_COLOR }]}>
//             {description}
//           </Text>

//           {variants?.length > 0 ? (
//             <View style={styles.sizeContainer}>
//               {variants.map((variant) => (
//                 <TouchableOpacity
//                   key={variant.name}
//                   style={[
//                     styles.sizeButton,
//                     selectedSize === variant.name && { backgroundColor: THEME_COLOR }
//                   ]}
//                   onPress={() => handleSizeSelection(variant.name)}
//                 >
//                   <Text style={[
//                     styles.sizeButtonText,
//                     selectedSize === variant.name && { color: WHITE_COLOR }
//                   ]}>
//                     {variant.name}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ) : (
//             <Text style={{ color: darkMode ? WHITE_COLOR : BLACK_COLOR }}>
//               No variants available
//             </Text>
//           )}

//           {renderSpecificationsTable()}
//           {renderToppingsSection()}
          
//           <View style={styles.quantityContainer}>
//             <Text style={[styles.quantityLabel, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
//               Quantity:
//             </Text>
//             <View style={styles.quantityWrapper}>
//               <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
//                 <Text style={styles.quantityButtonText}>-</Text>
//               </TouchableOpacity>
//               <Text style={[styles.quantityText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
//                 {quantity}
//               </Text>
//               <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
//                 <Text style={styles.quantityButtonText}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.priceContainer}>
//             <Text style={[styles.priceLabel, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
//               Total Price:
//             </Text>
//             <Text style={[styles.price, { color: THEME_COLOR }]}>
//               {`Rs. ${getAdjustedPrice()}`}
//             </Text>
//           </View>

//           <CustomButton
//             title="Add to Cart"
//             onPress={handleAddCart}
//             style={styles.addToCartButton}
//             textStyle={styles.addToCartText}
//           />
//         </View>
//       </ScrollView>

//       <RBSheet
//         ref={successSheetRef}
//         height={150}
//         closeOnDragDown={false}
//         closeOnPressMask={false}
//         customStyles={{
//           container: [
//             styles.successSheet,
//             { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }
//           ],
//           draggableIcon: { backgroundColor: THEME_COLOR }
//         }}
//       >
//         <View style={styles.successContent}>
//           <Image source={IMAGE29} style={styles.successIcon} />
//           <Text style={[styles.successText, { color: darkMode ? WHITE_COLOR : BLACK_COLOR }]}>
//             Item Added to Cart
//           </Text>
//         </View>
//       </RBSheet>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginVertical: 20,
//   },
//   card: {
//     paddingTop: 45,
//     width: "100%",
//     left: 10,
//   },
//   name: {
//     fontSize: 26,
//     marginBottom: 4,
//     marginTop: 20,
//     fontWeight: "300",
//   },
//   description: {
//     width: "98%",
//     fontSize: 16,
//     textAlign: "start",
//     fontWeight: "400",
//     marginTop: 7,
//     marginBottom: 15,
//   },
//   image: {
//     left: -10,
//     width: "100%",
//     height: 250,
//     marginVertical: 2,
//   },
//   sizeContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   sizeButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     margin: 8,
//     minWidth: 80,
//     alignItems: "center",
//     backgroundColor: GRAY_COLOR,
//   },
//   sizeButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: BLACK_COLOR,
//   },
//   quantityContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//     width: "60%",
//   },
//   quantityLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 8,
//     marginRight:"40%",
//   },
//   quantityWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 30,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//   },
//   quantityButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: THEME_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   quantityButtonText: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: WHITE_COLOR,
//   },
//   quantityText: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginHorizontal: 20,
//     minWidth: 40,
//     textAlign: "center",
//   },
//   priceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 30,
//     width: '80%',
//   },
//   priceLabel: {
//     fontSize: 20,
//     fontWeight: "700",
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: "700",
//   },
//   arrowIcon: {
//     width: 34,
//     height: 34,
//   },
//   arrowIconContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//     zIndex: 1,
//     padding: 10,
//   },
//   section: {
//     width: '95%',
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'left',
//   },
//   table: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: THEME_COLOR,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     borderBottomColor: THEME_COLOR,
//   },
//   tableCell: {
//     fontSize: 14,
//   },
//   tableCellLeft: {
//     flex: 1,
//     textAlign: 'left',
//   },
//   tableCellRight: {
//     flex: 1,
//     textAlign: 'right',
//     marginRight: 10,
//   },
//   plusIcon: {
//     width: 24,
//     height: 24,
//   },
//   successContent: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   successIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 15,
//   },
//   successText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   addToCartButton: {
//     backgroundColor: THEME_COLOR,
//     marginBottom: 80,
//     width: '95%',
//   },
//   addToCartText: {
//     color: WHITE_COLOR,
//   },
//   successSheet: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

// export default AddItem;

import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { BURGERIMG, ARROW_ICON, PLUS_ICON, VERIFIED_ICON, IMAGE29 } from "../../res/drawables";
import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, BLACK_COLOR, LIGHT_GRAY } from "../../res/colors";
import CustomButton from "../../components/CustomButtom";
import useCartStore from "../../store/CartStore";
import useThemeStore from "../../../zustand/ThemeStore";

const AddItem = ({ navigation, route }) => {
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
    // flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  card: {
    padding: 20,
    // paddingTop: 60,
  },
  arrowIconContainer: {
    // position: 'absolute',
    // left: 4,
    // top: 3,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
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

export default AddItem;