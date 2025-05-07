import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { INPUT_BACK_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, THEME_COLOR, BLACK_COLOR, GRAY_COLOR } from '../res/colors';
import { useNavigation } from '@react-navigation/native';
import { CHEVRON_ICON } from '../res/drawables';
import CustomButton from './CustomButtom';

const items = [
  { name: 'Settings', screen: 'Settings' },
  { name: 'Language', screen: 'LanguageSettings' },
  { name: 'Update Profile', screen: 'UpdateProfile' },
];

const PersonalDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              index === items.length - 1 && styles.lastItem,
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Image
              source={CHEVRON_ICON}
              style={styles.chevron}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutContainer}>
        <CustomButton title="Logout" />
      </View>
    </View>
  );
};

export default PersonalDetails;
const styles = StyleSheet.create({
  wrapper: {
   // flex: 1,
    padding: 16,
   // backgroundColor: INPUT_BACK_COLOR,
  },
  card: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    overflow: 'hidden',
    // elevation: 3,
    shadowColor: BLACK_COLOR,
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
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_TEXT_COLOR,
  },
  chevron: {
    width: 16,
    height: 16,
    tintColor: THEME_COLOR, 
  },
  logoutContainer: {
    marginTop: 26,
    padding: 16,
  },
});