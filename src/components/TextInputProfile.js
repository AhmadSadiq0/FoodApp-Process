import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
// CustomButton
import CustomButton from "./CustomButtom";
//State Manage
import useThemeStore from "../../zustand/ThemeStore";
//Colors
import { GRAY_COLOR, WHITE_COLOR, THEME_COLOR, THEME_TEXT_COLOR, BLACK_COLOR } from "../res/colors";
//Images
import { IMAGE28 } from "../res/drawables";

const EditableField = ({ label, value, showEditIcon, fieldName, onSave }) => {
  const { darkMode } = useThemeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(fieldName, text);
    setIsEditing(false);
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
  phoneNo, 
  address, 
  debitCardDetail, 
  password,
  onSave,
  isUpdating
}) => {
  const { darkMode } = useThemeStore();
  const [formData, setFormData] = useState({
    firstname,
    lastname,
    username,
    email,
    phoneNo,
    address,
    password,
    
  });

  const handleSave = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (onSave) {
      onSave({ ...formData, [field]: value });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
      {/* <EditableField 
        label="Full Name" 
        value={formData.username} 
        showEditIcon={showEditIcon}
        fieldName="username"
        onSave={handleSave}
      /> */}
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
        label="Email" 
        value={formData.email} 
        showEditIcon={showEditIcon}
        fieldName="email"
        onSave={handleSave}
      />
      <EditableField 
        label="PhoneNo" 
        value={formData.phoneNo} 
        showEditIcon={showEditIcon}
        fieldName="phoneNo"
        onSave={handleSave}
      />
      <EditableField 
        label="Address" 
        value={formData.address} 
        showEditIcon={showEditIcon}
        fieldName="address"
        onSave={handleSave}
      />
      <EditableField 
        label="DebitCardDetail" 
        value={debitCardDetail} 
        showEditIcon={showEditIcon}
        fieldName="debitCardDetail"
        onSave={handleSave}
      />
      {showButton && (
        <CustomButton 
          title="Update Profile"
          textStyle={{ color: WHITE_COLOR }}
          onPress={() => onSave(formData)} 
          loading={isUpdating}
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