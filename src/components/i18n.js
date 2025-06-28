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