import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InputField = ({ label, placeholder, secureTextEntry, value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [labelColor, setLabelColor] = useState("#3C2E6B"); 

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleTextChange = (text) => {
    onChangeText(text); 
    setLabelColor(text ? "#dddddd" : "#371F76"); 
  };
    const handleFocus = () => {
    setLabelColor("#dddddd"); 
  };

  const handleBlur = () => {
    setLabelColor(value ? "#dddddd" : "#371F76"); 
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          value={value}
          onChangeText={handleTextChange} 
          onFocus={handleFocus} // Change label color on focus
          onBlur={handleBlur} 
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#3C2E6B"
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
    position: "relative",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    position: "absolute",
    backgroundColor:'white',
    top: -12,
    left: 20,
    zIndex: 9,
  },
  input: {
    height: 75,
    width: "100%",
    color: "#3C2E6B",
    fontSize: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 25,
  },
});

export default InputField;
