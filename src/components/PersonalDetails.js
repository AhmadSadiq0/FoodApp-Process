import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  INPUT_BACK_COLOR,
  WHITE_COLOR,
  THEME_TEXT_COLOR,
  THEME_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
} from '../res/colors';
import { useNavigation } from '@react-navigation/native';
import { CHEVRON_ICON } from '../res/drawables';
import CustomButton from './CustomButtom';
import useThemeStore from '../../zustand/ThemeStore';
import useAuthStore from '../store/AuthStore';
const items = [
  { name: 'Settings', screen: 'Settings' },
 // { name: 'Language', screen: 'LanguageSettings' },
  { name: 'Update Profile', screen: 'UpdateProfile' },
];

const PersonalDetails = () => {
  const navigation = useNavigation();
  const { darkMode } = useThemeStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <View style={[styles.wrapper, darkMode && styles.wrapperDark]}>
      <View style={[styles.card, darkMode && styles.cardDark]}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              index === items.length - 1 && styles.lastItem,
              darkMode && styles.itemDark,
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={[styles.itemText, darkMode && styles.itemTextDark]}>
              {item.name}
            </Text>
            <Image
              source={CHEVRON_ICON}
              style={[styles.chevron, darkMode && styles.chevronDark]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutContainer}>
      <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  wrapperDark: {
    backgroundColor: BLACK_COLOR,
  },
  card: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: BLACK_COLOR,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    shadowColor: WHITE_COLOR,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLOR,
  },
  itemDark: {
    borderBottomColor: '#333',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: THEME_TEXT_COLOR,
  },
  itemTextDark: {
    color: WHITE_COLOR,
  },
  chevron: {
    width: 16,
    height: 16,
    tintColor: THEME_COLOR,
  },
  chevronDark: {
    tintColor: WHITE_COLOR,
  },
  logoutContainer: {
    marginTop: 26,
    padding: 16,
  },
});
