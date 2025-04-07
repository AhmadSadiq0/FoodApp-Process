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
const EditableField = (props) => {
  const { label, value, showEditIcon,showButton } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const { darkMode } = useThemeStore();
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

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

const TextInputProfile = ({ showEditIcon, showButton,username, email, phoneNo, address, debitCardDetail,password }) => {
  // console.log("Profile Data:", { username, email, phoneNo, address, debitCardDetail, password }); // Debugging

  const { darkMode } = useThemeStore(); 
  return (
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
      <EditableField label="Full Name" value={username} showEditIcon={showEditIcon} />
      <EditableField label="Email" value={email} showEditIcon={showEditIcon} />
      {/* <EditableField label="Password" value={password} showEditIcon={showEditIcon} /> */}
      <EditableField label="PhoneNo" value={phoneNo} showEditIcon={showEditIcon} />
      <EditableField label="Address" value={address} showEditIcon={showEditIcon} />
      <EditableField label="DebitCardDetail" value={debitCardDetail} showEditIcon={showEditIcon} />
      {showButton && <CustomButton title={"UpdateProfile"} textStyle={{ color: WHITE_COLOR }} />}
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