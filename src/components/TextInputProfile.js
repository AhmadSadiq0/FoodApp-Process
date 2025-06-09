import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "./CustomButtom";
import useThemeStore from "../../zustand/ThemeStore";
import { GRAY_COLOR, WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, BLACK_COLOR } from "../res/colors";
import { IMAGE28 } from "../res/drawables";

const EditableField = ({ label, value, showEditIcon, fieldName, onSave,keyboardType  }) => {
  const { darkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(fieldName, text);
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR, borderColor: darkMode ? THEME_COLOR : GRAY_COLOR },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: darkMode ? WHITE_COLOR : GRAY_COLOR }]}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}
            value={text}
            onChangeText={setText}
            autoFocus
            keyboardType={keyboardType || 'default'}
          />
        ) : (
          <Text style={[styles.value, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>{text}</Text>
        )}
      </View>
      {showEditIcon && (
        <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
          <Image source={IMAGE28} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const TextInputProfile = ({ 
  showEditIcon, 
  showButton, 
  username, 
  firstname,
  lastname,
  email, 
  phone, 
  address, 
  password,
  onSave,
  isUpdating
}) => {
  const { darkMode } = useThemeStore();
  const [formData, setFormData] = useState({
    firstname,
    lastname,
    phone,
    address,
  });
  
  const [initialData] = useState({
    firstname,
    lastname,
    phone,
    address,
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const checkForChanges = (newFormData) => {
    return Object.keys(newFormData).some(
      key => newFormData[key] !== initialData[key]
    );
  };

  const handleSave = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    const changesExist = checkForChanges(newFormData);
    setHasChanges(changesExist);
    // if (onSave) {
    //   onSave(newFormData);
    // }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
      <EditableField 
        label="First Name" 
        value={formData.firstname} 
        showEditIcon={showEditIcon}
        fieldName="firstname"
        onSave={handleSave}
      />
      <EditableField 
        label="Last Name" 
        value={formData.lastname} 
        showEditIcon={showEditIcon}
        fieldName="lastname"
        onSave={handleSave}
      />
      
      <EditableField 
        label="Phone" 
        value={formData.phone} 
        showEditIcon={showEditIcon}
        fieldName="phone"
        onSave={handleSave}
         keyboardType="numeric"
      />
      <EditableField 
        label="Address" 
        value={formData.address || ''} 
        showEditIcon={showEditIcon}
        fieldName="address"
        onSave={handleSave}
      />
      
      {showButton && hasChanges && (
        <CustomButton
          title="Update Profile"
          onPress={() => onSave(formData)}
          loading={isUpdating}
          textStyle={{ color: WHITE_COLOR }}
        />
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
    marginBottom: 28,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    paddingVertical: 4,
    fontWeight: "600",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: THEME_COLOR,
  },
});
export default TextInputProfile; 