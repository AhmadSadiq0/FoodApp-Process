// import * as Localization from 'expo-localization';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // English translations
// const enTranslations = {
//   common: {
//     save: 'Save',
//     close: 'Close',
//     selectLanguage: 'Select Language',
//     language: 'Language',
//     cancel: 'Cancel',
//     ok: 'OK',
//     confirm: 'Confirm',
//     back: 'Back',
//     next: 'Next',
//     done: 'Done',
//     edit: 'Edit',
//     delete: 'Delete',
//     settings: 'Settings',
//     profile: 'Profile',
//     home: 'Home',
//   },
//   profile: {
//     guest: 'Guest',
//     guestEmail: 'guest@example.com',
//     editProfile: 'Edit Profile',
//     changePassword: 'Change Password',
//     logout: 'Logout',
//     name: 'Name',
//     email: 'Email',
//     phone: 'Phone',
//     address: 'Address',
//     firstname: 'First Name',
//     lastname: 'Last Name',
//     phone: 'Phone Number',
//   },
//   settings: {
//     language: 'Language',
//     selectLanguage: 'Select Language',
//     darkMode: 'Dark Mode',
//     notifications: 'Notifications',
//     privacy: 'Privacy',
//     help: 'Help',
//     about: 'About App',
//     version: 'Version',
//     theme: 'Theme',
//     account: 'Account Settings',
//   },
//   auth: {
//     login: 'Login',
//     register: 'Register',
//     forgotPassword: 'Forgot Password?',
//     username: 'Username',
//     password: 'Password',
//     confirmPassword: 'Confirm Password',
//     alreadyHaveAccount: 'Already have an account? Login',
//     dontHaveAccount: "Don't have an account? Register",
//   },
//   validation: {
//     required: 'This field is required',
//     emailInvalid: 'Email is invalid',
//     passwordLength: 'Password must be at least 6 characters',
//     passwordNotMatch: 'Passwords do not match',
//   }
// };

// // Urdu translations
// const urTranslations = {
//   common: {
//     save: 'محفوظ کریں',
//     close: 'بند کریں',
//     selectLanguage: 'زبان منتخب کریں',
//     language: 'زبان',
//     cancel: 'منسوخ کریں',
//     ok: 'ٹھیک ہے',
//     confirm: 'تصدیق کریں',
//     back: 'پیچھے',
//     next: 'اگلا',
//     done: 'ہو گیا',
//     edit: 'ترمیم',
//     delete: 'حذف کریں',
//     settings: 'ترتیبات',
//     profile: 'پروفائل',
//     home: 'گھر',
//   },
//   profile: {
//     guest: 'مہمان',
//     guestEmail: 'مہمان@example.com',
//     editProfile: 'پروفائل میں ترمیم کریں',
//     changePassword: 'پاس ورڈ تبدیل کریں',
//     logout: 'لاگ آؤٹ',
//     name: 'نام',
//     email: 'ای میل',
//     phone: 'فون',
//     address: 'پتہ',
//     firstname: 'پہلا نام',
//     lastname: 'آخری نام',
//     phone: 'فون نمبر',
//   },
//   settings: {
//     language: 'زبان',
//     selectLanguage: 'زبان منتخب کریں',
//     darkMode: 'ڈارک موڈ',
//     notifications: 'اطلاعات',
//     privacy: 'رازداری',
//     help: 'مدد',
//     about: 'ایپ کے بارے میں',
//     version: 'ورژن',
//     theme: 'تھیم',
//     account: 'اکاؤنٹ کی ترتیبات',
//   },
//   auth: {
//     login: 'لاگ ان',
//     register: 'رجسٹر کریں',
//     forgotPassword: 'پاس ورڈ بھول گئے؟',
//     username: 'صارف نام',
//     password: 'پاس ورڈ',
//     confirmPassword: 'پاس ورڈ کی تصدیق کریں',
//     alreadyHaveAccount: 'پہلے سے اکاؤنٹ ہے؟ لاگ ان کریں',
//     dontHaveAccount: "اکاؤنٹ نہیں ہے؟ رجسٹر کریں",
//   },
//   validation: {
//     required: 'یہ فیلڈ ضروری ہے',
//     emailInvalid: 'ای میل درست نہیں ہے',
//     passwordLength: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے',
//     passwordNotMatch: 'پاس ورڈ مماثل نہیں ہیں',
//   }
// };

// const translations = {
//   en: enTranslations,
//   ur: urTranslations,
// };

// let currentLanguage = 'en';

// export const getTranslation = (key) => {
//   const keys = key.split('.');
//   let value = translations[currentLanguage];
  
//   for (const k of keys) {
//     value = value?.[k];
//     if (!value) break;
//   }
  
//   return value || key;
// };

// export const changeLanguage = async (language) => {
//   try {
//     await AsyncStorage.setItem('userLanguage', language);
//     currentLanguage = language;
//   } catch (error) {
//     console.error('Error changing language:', error);
//   }
// };
// export const getCurrentLanguage = async () => {
//   try {
//     const language = await AsyncStorage.getItem('userLanguage');
//     if (language) {
//       currentLanguage = language;
//       return language;
//     }
//     return Localization.locale.split('-')[0] || 'en';
//   } catch (error) {
//     console.error('Error getting language:', error);
//     return 'en';
//   }
// };

// export const t = getTranslation;






// import React, { useState, useRef, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   Alert,
//   Text,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
//   TextInput,
// } from "react-native";
// import { Confirm_Order } from "../../res/drawables";
// import { ConfirmOrderSummary, DeliveryAddress, PaymentComponent, Header1, OrderTypeSelector, CustomButton } from "../../components";
// import { IMAGE25 } from "../../res/drawables";
// import { Back_Ground, WHITE_COLOR, BLACK_COLOR, THEME_COLOR, DARK_THEME_BACKGROUND, THEME_TEXT_COLOR, INPUT_BACK_COLOR } from "../../res/colors";
// import useThemeStore from "../../../zustand/ThemeStore";
// import RBSheet from "react-native-raw-bottom-sheet";
// import useAuthStore from "../../store/AuthStore";
// import useBranchStore from "../../store/BranchStore";
// import useOrderStore from "../../store/OrderStore";
// import useCartStore from "../../store/CartStore";

// const paymentMethods = [
//   { name: "Cash on Delivery", value: "cash", image: IMAGE25 },
// ];

// const OrderConfirmationScreen = ({ route, navigation }) => {
//   const { selectedItems = [], selectedExtras = [], subtotal = 0 } = route.params || {};
//   const { darkMode } = useThemeStore();
//   const { selectedBranch } = useBranchStore();
//   const { createOrder, orders_loading, orders_error, setOrdersLoading } = useOrderStore();
//   const { clearCart } = useCartStore();
//   const [name, setName] = useState("");
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [orderType, setOrderType] = useState("delivery");
//   const [address, setAddress] = useState({
//     street: "",
//     city: "",
//     phone: "",
//     instructions: ""
//   });
//   const [orderInstructions, setOrderInstructions] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [error, setError] = useState(null);
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const sheetRef = useRef(null);
//   const paymentRef = useRef(null);
//   const scrollViewRef = useRef(null);

//   const tax = subtotal * 0.08;
//   const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
//   const totalAmount = subtotal + tax + deliveryFee;

//   useEffect(() => {
//     setOrdersLoading(false);
//   }, []);

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
//       () => setIsKeyboardVisible(true)
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
//       () => setIsKeyboardVisible(false)
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     let valid = false;
//     if (orderType) {
//       if (orderType === 'delivery') {
//         valid = selectedPayment !== null &&
//           address.street.trim() !== "" &&
//           address.city.trim() !== "" &&
//           address.phone.trim() !== "";
//       } else {
//         valid = selectedPayment !== null;
//       }
//     }
//     setIsFormValid(valid);
//   }, [orderType, selectedPayment, address, name]);

//   const handlePaymentSelection = (paymentMethod) => {
//     setSelectedPayment(paymentMethod);
//   };

//   const buildOrderPayload = () => {
//     const items = selectedItems.map(item => ({
//       itemId: item.itemId,
//       name: item.name,
//       categoryId: item.categoryId,
//       categoryName: item.categoryName,
//       variant: {
//         _id: item.variant?._id,
//         name: item.variant.name,
//         price: item.variant.price,
//         specifications: item.variant?.specifications?.map(spec => ({
//           _id: spec._id,
//           key: spec.key,
//           value: spec.value
//         })) || [],
//         toppings: item.variant?.toppings?.map(topping => ({
//           _id: topping._id,
//           name: topping.name,
//           price: topping.price
//         })) || []
//       },
//       quantity: item.quantity,
//       unitPrice: item.variant.price,
//       totalPrice: item.variant.price * item.quantity,
//       deliveryInstructions: item.deliveryInstructions || ''
//     }));

//     const extras = selectedExtras.map(extra => ({
//       extraId: extra._id,
//       name: extra.name,
//       price: extra.price,
//       quantity: extra.quantity
//     }));

//     const payload = {
//       orderType,
//       customerName: name,
//       items,
//       extras,
//       branchId: selectedBranch?._id,
//       payment: {
//         method: selectedPayment?.value.toLowerCase(),
//         status: 'pending',
//         amount: totalAmount,
//         transactionId: '',
//         paidAt: undefined
//       },
//       subtotal,
//       tax,
//       deliveryFee,
//       discount: 0,
//       totalAmount,
//       deliveryInstructions: orderType === 'delivery' ? (address.instructions || '') : (orderInstructions || '')
//     };

//     if (orderType === 'delivery' && address) {
//       payload.delivery = {
//         address: {
//           street: address.street,
//           city: address.city
//         },
//         contactNumber: address.phone,
//         deliveryInstructions: address.instructions || '',
//         estimatedDeliveryTime: undefined,
//         actualDeliveryTime: undefined
//       };
//     }

//     return payload;
//   };

//   const handleConfirmOrder = async () => {
//     console.log("Order Payload ===> ", JSON.stringify(buildOrderPayload(), null, 2));
//     if (!name.trim()) {
//       Alert.alert("Validation Error", "Please enter your name");
//       return;
//     }

//     if (orderType === 'delivery' && (!address.street.trim() || !address.city.trim() || !address.phone.trim())) {
//       Alert.alert("Validation Error", "Please fill all address fields");
//       return;
//     }

//     const orderPayload = buildOrderPayload();
//     const res = await createOrder(orderPayload);

//     if (res.success) {
//       sheetRef.current?.close();
//       clearCart();
//       navigation.navigate("ConfirmedOrder", { orderPayload });
//     } else {
//       setError(res.message);
//     }
//   };

//   const renderContent = () => {
//     if (!orderType) {
//       return (
//         <OrderTypeSelector
//           onSelect={setOrderType}
//           darkMode={darkMode}
//         />
//       );
//     }

//     return (
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//        // keyboardShouldPersistTaps="handled"
//       >
//         <OrderTypeSelector
//           selectedType={orderType}
//           onSelect={setOrderType}
//           darkMode={darkMode}
//         />
//         {/* {orderType !== 'delivery' && (
//           <View style={styles.container2}>
//             <Text style={[styles.label, darkMode ? { color: WHITE_COLOR } : { color: THEME_TEXT_COLOR }]}>
//               Order Instructions (optional)
//             </Text>
//             <TextInput
//               value={orderInstructions}
//               onChangeText={setOrderInstructions}
//               placeholder="e.g. No cheese, extra spicy, call on arrival"
//               placeholderTextColor={darkMode ? WHITE_COLOR : THEME_TEXT_COLOR}
//               style={[
//                 styles.textInput,
//                 darkMode ? styles.darkTextInput : styles.lightTextInput
//               ]}
//               multiline
//             />
//           </View>
//         )} */}
//         <PaymentComponent
//           ref={paymentRef}
//           name={name}
//           setName={setName}
//           paymentMethods={paymentMethods}
//           onSelectPayment={handlePaymentSelection}
//           selectedMethod={selectedPayment}
//           themeColor={THEME_COLOR}
//           darkMode={darkMode}
//         />

//         {orderType === 'delivery' && (
//           <DeliveryAddress
//             onAddressChange={setAddress}
//             address={address}
//             scrollToInput={(yPosition) => {
//               scrollViewRef.current?.scrollTo({ y: yPosition, animated: true });
//             }}
//             darkMode={darkMode}
//           />
//         )}
//       </ScrollView>
//     );
//   };
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         style={{ flex: 1, backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         // keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 30}
//       >
//         <View style={[styles.container, { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground }]}>
//           {renderContent()}
//           <RBSheet
//             ref={sheetRef}
//             height={490}
//             draggable={true}
//             customStyles={{
//               container: {
//                 borderTopLeftRadius: 20,
//                 borderTopRightRadius: 20,
//                 backgroundColor: darkMode ? DARK_THEME_BACKGROUND : WHITE_COLOR,
//                 ...(darkMode && {
//                   borderTopWidth: 3,
//                   borderLeftWidth: 3,
//                   borderRightWidth: 3,
//                   borderColor: THEME_COLOR,
//                 }),
//               },
//             }}
//           >
//             <ConfirmOrderSummary
//               sheetRef={sheetRef}
//               selectedItems={selectedItems}
//               selectedExtras={selectedExtras}
//               subtotal={subtotal}
//               tax={tax}
//               deliveryFee={deliveryFee}
//               totalAmount={totalAmount}
//               paymentMethod={selectedPayment}
//               orderType={orderType}
//               deliveryAddress={address}
//               onButtonPressed={handleConfirmOrder}
//               isButtonDisabled={!isFormValid}
//               darkMode={darkMode}
//               loading={orders_loading}
//             />
//           </RBSheet>

//          {!isKeyboardVisible && (
//           (orderType && selectedPayment && name) && (
//             (orderType !== "delivery" ||
//               (address?.street?.trim() && address?.city?.trim() && address?.phone?.trim())) && (
//                 <View style={[
//                   styles.footer,
//                   { backgroundColor: darkMode ? DARK_THEME_BACKGROUND : Back_Ground },
//                   darkMode && styles.footerDark
//                 ]}>
//                   {orders_error && (
//                     <Text style={{ color: 'red', marginBottom: 10 }}>{orders_error}</Text>
//                   )}
//                   <CustomButton
//                     title="Confirm Order"
//                     onPress={() => {
//                       sheetRef.current?.open();
//                     }}
//                     style={[
//                       styles.confirmButton,
//                       darkMode && { backgroundColor: THEME_COLOR }
//                     ]}
//                     textStyle={darkMode ? { color: WHITE_COLOR } : {}}
//                     disabled={!isFormValid}
//                   />
//                 </View>
//               )
//             )
//           )}
//         </View>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: Back_Ground
//   },
//   containerDark: {
//    backgroundColor: BLACK_COLOR,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingBottom: 100,
//     paddingHorizontal: 10,
//     // backgroundColor: BLACK_COLOR,
//   },
//   footer: {
//     padding: 16,
//     backgroundColor: Back_Ground,
//   },
//   footerDark: {
//     backgroundColor: DARK_THEME_BACKGROUND,
//     borderTopColor: THEME_COLOR,
//   },
//   confirmButton: {
//     width: '100%',
//     paddingVertical: 10,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: WHITE_COLOR,
//   },
//   container2: {
//     marginHorizontal: 16,
//     marginBottom: 16
//   },
//   label: {
//     marginBottom: 6,
//     fontWeight: '500',
//   },
//   textInput: {
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: THEME_COLOR,
//     padding: 12,
//     minHeight: 48,
//     textAlignVertical: 'top',
//   },
//   lightTextInput: {
//     color: BLACK_COLOR
//   },
//   darkTextInput: {
//     backgroundColor: DARK_THEME_BACKGROUND,
//     color: WHITE_COLOR
//   }
// });

// export default OrderConfirmationScreen;