import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME_TEXT_COLOR } from "../res/colors";
import { GRAY_COLOR } from "../res/colors";
import { WHITE_COLOR } from "../res/colors";


const InputField = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  style,
  keyboardType = "default", 
  autoCapitalize = "none", 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [labelColor, setLabelColor] = useState("#3C2E6B");

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleTextChange = (text) => {
    onChangeText(text);
    setLabelColor(text ? GRAY_COLOR : THEME_TEXT_COLOR);
  };

  const handleFocus = () => {
    setLabelColor(GRAY_COLOR);
  };

  const handleBlur = () => {
    setLabelColor(value ? GRAY_COLOR : THEME_TEXT_COLOR);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType} 
          autoCapitalize={autoCapitalize} 
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color= {THEME_TEXT_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: GRAY_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    position: "absolute",
    backgroundColor: WHITE_COLOR,
    top: -12,
    left: 20,
    zIndex: 9,
  },
  input: {
    height: 75,
    flex: 1,
    color: THEME_TEXT_COLOR,
    fontSize: 15,
    padding: 15,
    borderRadius: 10,
    fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
});

export default InputField;
