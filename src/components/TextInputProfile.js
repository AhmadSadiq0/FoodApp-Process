import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomButton from "./CustomButtom";
import {
  GRAY_COLOR,
  WHITE_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
} from "../res/colors";
import { IMAGE28 } from "../res/drawables";
const EditableField = (props) => {
  const { label, value, showEditIcon } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{text}</Text>
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

const TextInputProfile = ({ showEditIcon, showButton }) => {
  return (
    <View styles={styles.container}>
      <EditableField
        label="Full Name"
        value="ZainZaka"
        showEditIcon={showEditIcon}
      />
      <EditableField
        label="Email"
        value="xainzaka@gmail.com"
        showEditIcon={showEditIcon}
      />
      <EditableField
        label="Password"
        value="12345678"
        showEditIcon={showEditIcon}
      />
      <EditableField
        label="PhoneNo"
        value="12345678"
        showEditIcon={showEditIcon}
      />
      <EditableField
        label="Address"
        value="12345678"
        showEditIcon={showEditIcon}
      />
      <EditableField
        label="DebitCardDetail"
        value="12345678"
        showEditIcon={showEditIcon}
      />
      {showButton && <CustomButton title={"UpdateProfile"} textStyle={{color:WHITE_COLOR}}/>}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 8,
    marginBottom: 28,
    borderColor:GRAY_COLOR,
    borderWidth:1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: GRAY_COLOR,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: THEME_TEXT_COLOR,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    color: THEME_TEXT_COLOR,
    paddingVertical: 4,
    fontWeight:'600'
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: THEME_COLOR,
  },
});
export default TextInputProfile;
