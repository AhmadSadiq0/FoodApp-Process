import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import CustomButton from './CustomButtom';

const items = [
    { name: 'SettingsScreen', screen: 'Settings' },
    { name: 'Language', screen: 'LanguageSettings' },
     { name: 'UpdateProfile', screen: 'UpdateProfile' },
    // { name: 'Help&Support', screen: 'HelpSupportScreen' },
  ];
const PersonalDetails = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.divider} />
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
             <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" /> 
          </TouchableOpacity>
        ))}
      <CustomButton title="Logout" />
    </View>
  );
};
export default PersonalDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    // backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
     borderBottomColor: '#E5E7EB',
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '600',
    // color: '#111827',
  },
});
