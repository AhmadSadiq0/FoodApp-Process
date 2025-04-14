import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ExtrasItem = ({ extras, selectedExtras, toggleExtra, darkMode }) => {
  if (!extras?.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: darkMode ? '#FFF' : '#333' }]}>
          Available Extras
        </Text>
        <Text style={[styles.sectionSubtitle, { color: darkMode ? '#AAA' : '#666' }]}>
          Enhance your meal with these delicious additions
        </Text>
      </View>
      
      <View style={styles.extrasContainer}>
        {extras.map((extra) => (
          <TouchableOpacity 
            key={extra._id}
            activeOpacity={0.8}
            onPress={() => toggleExtra(extra)}
          >
            <View style={[
              styles.extraItem, 
              darkMode && styles.extraItemDark
            ]}>
              <Image 
                source={{ uri: extra.image }} 
                style={styles.extraImage}
                resizeMode="cover"
              />
              
              <View style={styles.extraDetails}>
                <Text style={[
                  styles.extraName, 
                  darkMode && styles.extraNameDark
                ]}>
                  {extra.name}
                </Text>
                <Text style={[
                  styles.extraDescription, 
                  darkMode && styles.extraDescriptionDark
                ]}>
                  {extra.description}
                </Text>
                <Text style={styles.extraPrice}>
                  Rs.{extra.price.toFixed(0)}
                </Text>
              </View>
              
              <View style={[
                styles.extraCheckbox, 
                darkMode && styles.extraCheckboxDark,
                selectedExtras.some(e => e._id === extra._id) && styles.extraCheckboxSelected
              ]}>
                {selectedExtras.some(e => e._id === extra._id) && (
                  <MaterialIcons name="check" size={16} color="#FFF" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 25,
    width: '100%',
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 13,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  extrasContainer: {
    marginTop: 12,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  extraItemDark: {
    backgroundColor: '#2A2A2A',
    borderColor: '#444',
  },
  extraImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  extraDetails: {
    flex: 1,
    marginRight: 12,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  extraNameDark: {
    color: '#FFF',
  },
  extraDescription: {
    fontSize: 13,
    marginBottom: 6,
    color: '#666',
    lineHeight: 18,
  },
  extraDescriptionDark: {
    color: '#AAA',
  },
  extraPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6347',
  },
  extraCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraCheckboxDark: {
    borderColor: '#666',
  },
  extraCheckboxSelected: {
    backgroundColor: '#FF6347',
    borderColor: '#FF6347',
  }
});

export default ExtrasItem;