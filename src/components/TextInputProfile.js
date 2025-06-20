import React, { useState, useEffect , useMemo } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "./CustomButtom";
import useThemeStore from "../../zustand/ThemeStore";
import { GRAY_COLOR, WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, BLACK_COLOR, GREEN_COLOR } from "../res/colors";
import { IMAGE28, CHECK_ICON } from "../res/drawables";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditableField = ({ label, value, fieldName, onFieldChange, keyboardType, darkMode }) => {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (newValue) => {
    setText(newValue);
    onFieldChange(fieldName, newValue);
  };


  

  return (
    <View
      style={[
        styles.card,
        { 
          backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR, 
          borderColor: isFocused ? THEME_COLOR : (darkMode ? THEME_COLOR : GRAY_COLOR),
          borderWidth: isFocused ? 2 : 1.5
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: darkMode ? WHITE_COLOR : GRAY_COLOR }]}>{label}</Text>
        <TextInput
          style={[styles.input, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}
          value={text}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType || 'default'}
          placeholder={`Enter ${label}`}
          placeholderTextColor={darkMode ? "#888" : "#aaa"}
        />
      </View>
      {isFocused && (
        <TouchableOpacity onPress={() => setIsFocused(false)}>
          <Image 
            source={CHECK_ICON} 
            style={[styles.icon, { tintColor: GREEN_COLOR }]} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const TextInputProfile = ({ 
  user,
  onSave,
  isUpdating
}) => {
  const { darkMode } = useThemeStore();
  
  const initialData = useMemo(() => ({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    phone: user?.phone || '',
    address: user?.address || '',
  }), [user]);

  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem('profileData');
        if (stored) {
          const parsed = JSON.parse(stored);
          setFormData({ ...initialData, ...parsed });
        } else {
          setFormData(initialData);
        }
      } catch (e) {
        setFormData(initialData);
      }
    };
    loadProfile();
  }, [initialData]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (value !== initialData[field]) {
        setChangedFields(prev => ({ ...prev, [field]: value }));
      } else {
        setChangedFields(prev => {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        });
      }
      return newData;
    });
  };

  useEffect(() => {
    setHasChanges(Object.keys(changedFields).length > 0);
  }, [changedFields]);

  // Update button click handler
  const handleSave = async () => {
    try {
      // Save to AsyncStorage
      const updatedData = { ...formData, ...changedFields };
      await AsyncStorage.setItem('profileData', JSON.stringify(updatedData));
      if (onSave) onSave(changedFields);
      setChangedFields({});
    } catch (e) {
      // handle error if needed
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
      <EditableField 
        label="First Name" 
        value={formData.firstname} 
        fieldName="firstname"
        onFieldChange={handleFieldChange}
        darkMode={darkMode}
      />
      
      <EditableField 
        label="Last Name" 
        value={formData.lastname} 
        fieldName="lastname"
        onFieldChange={handleFieldChange}
        darkMode={darkMode}
      />
      
      <EditableField 
        label="Phone" 
        value={formData.phone} 
        fieldName="phone"
        onFieldChange={handleFieldChange}
        keyboardType="phone-pad"
        darkMode={darkMode}
      />
      
      <EditableField 
        label="Address" 
        value={formData.address} 
        fieldName="address"
        onFieldChange={handleFieldChange}
        darkMode={darkMode}
      />
      
      {hasChanges && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Update Profile"
            onPress={handleSave}
            loading={isUpdating}
            textStyle={{ color: WHITE_COLOR }}
            buttonStyle={{ backgroundColor: THEME_COLOR }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
});

export default TextInputProfile;