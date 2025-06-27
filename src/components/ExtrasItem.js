import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME_COLOR, WHITE_COLOR, GRAY_COLOR, LIGHT_GRAY, BLACK_COLOR, DARK_THEME_BACKGROUND } from '../res/colors';
import QuantitySelector from './QuantitySelector';
import useExtraStore from '../store/ExtrasStore';

const ExtrasItem = ({ extras, darkMode }) => {
  const { selectedExtras, toggleExtra, updateExtraQuantity } = useExtraStore();
  
  if (!extras?.length) return null;

  return (
    <View style={[styles.section, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: darkMode ? WHITE_COLOR : THEME_COLOR }]}>
          Available Extras
        </Text>
        <Text style={[styles.sectionSubtitle, { color: darkMode ? GRAY_COLOR : '#666' }]}>
          Enhance your meal with these delicious additions
        </Text>
      </View>
      
      <View style={styles.extrasContainer}>
        {extras.map((extra) => {
          const isSelected = selectedExtras.some(e => e._id === extra._id);
          const selectedExtra = isSelected ? selectedExtras.find(e => e._id === extra._id) : null;
          const quantity = selectedExtra?.quantity || 1;

          return (
            <View key={extra._id} style={[
              styles.extraItemContainer,
              isSelected && styles.extraItemSelected,
              darkMode ? { backgroundColor: DARK_THEME_BACKGROUND, borderColor: GRAY_COLOR } : {},
            ]}>
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => toggleExtra(extra)}
                style={[styles.extraContent, darkMode ? { backgroundColor: DARK_THEME_BACKGROUND, borderRadius: 12, padding: 8 } : {}]}
              >
                <Image 
                  source={{ uri: extra.image }} 
                  style={styles.extraImage}
                  resizeMode="cover"
                />
                
                <Text style={[
                  styles.extraName,
                  { color: darkMode ? WHITE_COLOR : BLACK_COLOR }
                ]}>
                  {extra.name}
                </Text>

                <Text style={[
                  styles.extraPrice,
                  { color: darkMode ? WHITE_COLOR : THEME_COLOR }
                ]}>
                  Rs. {extra.price.toFixed(0)}
                </Text>
              </TouchableOpacity>

              {isSelected && (
                <View style={styles.quantityWrapper}>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrement={() => updateExtraQuantity(extra._id, quantity + 1)}
                    onDecrement={() => updateExtraQuantity(extra._id, Math.max(1, quantity - 1))}
                    darkMode={darkMode}
                    minQuantity={1}
                    style={styles.quantitySelector}
                  />
                </View>
              )}
            </View>
          );
        })}
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
    // fontStyle: 'italic',
  },
  extrasContainer: {
    // height:"50%",
    width:"50%",
    marginTop: 12,
  },
  extraItemContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
    marginBottom: 16,
    backgroundColor: WHITE_COLOR,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    paddingVertical: 16,
  },
  extraItemSelected: {
    borderColor: THEME_COLOR,
  },
  extraItemDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: GRAY_COLOR,
  },
  extraContent: {
    alignItems: 'center',
  },
  extraImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginBottom: 8,
  },
  extraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  extraPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  quantityWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  quantitySelector: {
    width: 120,
  }
});

export default ExtrasItem;   