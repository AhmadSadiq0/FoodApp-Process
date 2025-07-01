import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR, LIGHT_GRAY, DARK_GRAY } from "../res/colors";
import InputFieldAddress from "./InputFieldAddress";
import useThemeStore from "../../zustand/ThemeStore";
import CustomErrorText from "./CustomErrorText";

const DeliveryComponent = ({ onAddressChange , address : ParentAddress }) => {
  const { darkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    phone: "",
    instructions: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHasAddress(Object.values(address).some(value => value !== ""));
  }, [address]);

  const validateFields = () => {
    const newErrors = {};
    if (!address.street) newErrors.street = "Street address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      setIsEditing(false);
      onAddressChange(address);
    }
  };

  const handleChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  useEffect(() => {
    if (ParentAddress) {
      setAddress(ParentAddress);
    }
  }, [ParentAddress]);

  // Changed: Created a renderItem function for FlatList
  const renderContent = () => {
    if (!hasAddress && !isEditing) {
      return (
        <View style={[styles.emptyState, darkMode && styles.emptyStateDark]}>
          <Ionicons 
            name="alert-circle" 
            size={40} 
            color={THEME_COLOR} 
            style={styles.emptyIcon}
          />
          <Text style={[styles.emptyText, darkMode && styles.emptyTextDark]}>
            Please provide address for parcel delivery
          </Text>
          <TouchableOpacity 
            style={[styles.addButton, darkMode && styles.addButtonDark]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.addButtonText}>Add Address</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[styles.card, darkMode && styles.cardDark]}>
        {isEditing ? (
          <>
            <InputFieldAddress
              label="Street Address"
              value={address.street}
              onChange={v => handleChange('street', v)}
              error={errors.street}
              darkMode={darkMode}
            />
            <View style={styles.row}>
              <InputFieldAddress
                label="City"
                value={address.city}
                onChange={v => handleChange('city', v)}
                error={errors.city}
                darkMode={darkMode}
                containerStyle={{ flex: 1 }}
              />
            </View>
            <View style={styles.row}>
            </View>
            <InputFieldAddress
              label="Contact Number"
              value={address.phone}
              onChange={v => handleChange('phone', v)}
              error={errors.phone}
              darkMode={darkMode}
              keyboardType="phone-pad"
            />
            <InputFieldAddress
              label="Delivery Instructions(optional)"
              value={address.instructions}
              onChange={v => handleChange('instructions', v)}
              error={errors.instructions}
              darkMode={darkMode}
              multiline
            />
          </>
        ) : (
          <View style={styles.addressDisplay}>
            <Text style={[styles.addressText, darkMode && styles.addressTextDark]}>
              {address.street}, {address.city}
            </Text>
            <Text style={[styles.phoneText, darkMode && styles.phoneTextDark]}>
              Contact: {address.phone}
            </Text>
            {address.instructions && (
              <Text style={[styles.instructionsText, darkMode && styles.instructionsTextDark]}>
                Instructions: {address.instructions}
              </Text>
            )}
          </View>
        )}
        <TouchableOpacity 
          style={[styles.button, darkMode && styles.buttonDark]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Ionicons 
            name={isEditing ? "checkmark-circle" : "create"} 
            size={24} 
            color={darkMode ? WHITE_COLOR : THEME_COLOR} 
          />
          <Text style={[styles.buttonText, darkMode && styles.buttonTextDark]}>
            {isEditing ? "Save Address" : "Edit Address"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Changed: Data array for FlatList (we only need one item)
  const data = [{ id: 'delivery-content' }];

  return (
    <View style={[styles.screen, darkMode && styles.screenDark]}>
      {/* Changed: Replaced ScrollView with FlatList */}
      <FlatList
        data={data}
        renderItem={() => (
          <>
            <View style={styles.header}>
              <Ionicons name="location" size={24} color={THEME_COLOR} />
              <Text style={[styles.title, darkMode && styles.titleDark]}>Delivery Address</Text>
            </View>
            {renderContent()}
          </>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Back_Ground,
  },
  screenDark: {
    backgroundColor: BLACK_COLOR,
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: THEME_TEXT_COLOR,
    marginLeft: 12,
  },
  titleDark: {
    color: WHITE_COLOR,
  },
  card: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: DARK_GRAY,
    shadowColor: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
    marginBottom: 6,
  },
  inputLabelDark: {
    color: WHITE_COLOR,
  },
  input: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: THEME_TEXT_COLOR,
  },
  inputDark: {
    backgroundColor: BLACK_COLOR,
    color: WHITE_COLOR,
  },
  errorInput: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  addressDisplay: {
    marginBottom: 20,
  },
  addressText: {
    fontSize: 16,
    color: THEME_TEXT_COLOR,
    marginBottom: 4,
  },
  addressTextDark: {
    color: WHITE_COLOR,
  },
  phoneText: {
    fontSize: 14,
    color: THEME_COLOR,
    marginTop: 8,
  },
  phoneTextDark: {
    color: '#4A90E2',
  },
  instructionsText: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
    marginTop: 8,
  },
  instructionsTextDark: {
    color: WHITE_COLOR,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  buttonDark: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: THEME_TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  buttonTextDark: {
    color: WHITE_COLOR,
  },
  emptyState: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateDark: {
    backgroundColor: DARK_GRAY,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: THEME_TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyTextDark: {
    color: WHITE_COLOR,
  },
  addButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
  },
  addButtonDark: {
    backgroundColor: THEME_COLOR,
  },
  addButtonText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryComponent;