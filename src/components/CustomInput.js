import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
//icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
//color
import { THEME_TEXT_COLOR,WHITE_COLOR,GRAY_COLOR, THEME_COLOR } from "../res/colors";


const InputField = (props) => {
 const  {
    label,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    style,
    inputStyle,
    keyboardType = "default", 
    autoCapitalize = "none", 
  } = props;  
  const [showPassword, setShowPassword] = useState(false);
  const [labelColor, setLabelColor] = useState(THEME_TEXT_COLOR);
  const [borderColor , setBorderColor] = useState(GRAY_COLOR);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleTextChange = (text) => {
    onChangeText(text);
    setLabelColor(THEME_COLOR);
  };

  const handleFocus = () => {
    setLabelColor(THEME_COLOR);
    setBorderColor(THEME_COLOR);
  };

  const handleBlur = () => {
    setLabelColor(THEME_TEXT_COLOR);
    setBorderColor(GRAY_COLOR);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={{...styles.inputWrapper , borderColor}}>
        <TextInput
          style={[styles.input , inputStyle]}
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
    marginVertical: 10,
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
    fontSize: 14,
    marginBottom: 5,
    position: "absolute",
    backgroundColor: WHITE_COLOR,
    top: -10,
    left: 20,
    zIndex: 9,
  },
  input: {
    flex: 1,
    paddingVertical : 20,
    color: THEME_TEXT_COLOR,
    fontSize: 14,
    padding: 15,
    borderBottomWidth: 0,
    borderRadius: 10,
    // fontWeight: "bold",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
});

export default InputField;