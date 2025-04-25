import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // or react-native-vector-icons/FontAwesome5

const items = [
  'Personal informations',
  'Passport details',
  'Payment methods',
  'Flight preferences',
];

const PersonalDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>PERSONAL DETAILS</Text>
        <View style={styles.divider} />
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              index === items.length - 1 && styles.lastItem,
            ]}
            activeOpacity={0.7}
          >
            <Text style={styles.itemText}>{item}</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
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
    fontSize: 10,
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
