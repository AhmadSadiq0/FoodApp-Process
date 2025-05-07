import React,{useState,useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList,TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  GRAY_COLOR,
  THEME_COLOR,
  THEME_TEXT_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  DARK_GRAY,
  LIGHT_GRAY,
  ERROR_COLOR
} from "../res/colors";
import useThemeStore from "../../zustand/ThemeStore";

const PaymentComponent = React.forwardRef(({
  paymentMethods, 
  onSelectPayment, 
  selectedMethod,
  themeColor = THEME_COLOR,
  darkMode = false,
  autoSelectFirst = false,
  onNameChange,
}, ref) => {

  const { darkMode: systemDarkMode } = useThemeStore();
  const finalDarkMode = darkMode || systemDarkMode;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const paymentRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    validateName
  }));

  const paymentIcons = {
    'Cash': 'cash',
    'Debit Card': 'card',
    'App Wallet': 'wallet',
    'Online Payment': 'globe'
  };
  React.useEffect(() => {
    if (autoSelectFirst && paymentMethods?.length > 0 && !selectedMethod) {
      onSelectPayment(paymentMethods[0]);
    }
  }, [autoSelectFirst, paymentMethods, selectedMethod, onSelectPayment]);

  const handleNameChange = (text) => {
    setName(text);
    setNameError("");
    if (onNameChange) {
      onNameChange(text);
    }
  };

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Please enter your name");
      return false;
    }
    return true;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.option,
        finalDarkMode && styles.optionDark,
        selectedMethod?.name === item.name && styles.selectedOption
      ]}
      onPress={() => onSelectPayment(item)}
    >
      <View style={styles.optionContent}>
        <Ionicons 
          name={paymentIcons[item.name]} 
          size={24} 
          color={selectedMethod?.name === item.name ? WHITE_COLOR : themeColor} 
        />
        <View style={styles.textContainer}>
          <Text style={[
            styles.optionText,
            finalDarkMode && styles.optionTextDark,
            selectedMethod?.name === item.name && styles.selectedText
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.optionSubtext,
            finalDarkMode && styles.optionSubtextDark,
            selectedMethod?.name === item.name && styles.selectedSubtext
          ]}>
            {item.description || 'No additional fees'}
          </Text>
        </View>
      </View>
      
      <View style={[
        styles.radioButton,
        selectedMethod?.name === item.name && styles.radioButtonSelected,
        { borderColor: themeColor }
      ]}>
        {selectedMethod?.name === item.name && (
          <Ionicons name="checkmark" size={14} color={WHITE_COLOR} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, finalDarkMode && styles.containerDark]}>
      <Text style={[styles.title, finalDarkMode && styles.titleDark]}>
        Select Payment Method
      </Text>

      <View style={styles.nameInputContainer}>
        <Text style={[styles.inputLabel, finalDarkMode && styles.inputLabelDark]}>
          Your Name
        </Text>
        <TextInput
          style={[
            styles.nameInput,
            finalDarkMode && styles.nameInputDark,
            nameError && styles.errorInput
          ]}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
          placeholderTextColor={finalDarkMode ? LIGHT_GRAY : GRAY_COLOR}
          onBlur={validateName}
        />
        {nameError ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : null}
      </View>
      

      <FlatList
        data={paymentMethods}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  containerDark: {
    backgroundColor: DARK_GRAY,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_TEXT_COLOR,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  titleDark: {
    color: WHITE_COLOR,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  option: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionDark: {
    backgroundColor: BLACK_COLOR,
    shadowColor: '#444',
  },
  selectedOption: {
    backgroundColor: THEME_COLOR,
    shadowColor: THEME_COLOR,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME_TEXT_COLOR,
  },
  optionTextDark: {
    color: WHITE_COLOR,
  },
  selectedText: {
    color: WHITE_COLOR,
    fontWeight: '600',
  },
  optionSubtext: {
    fontSize: 14,
    color: GRAY_COLOR,
    marginTop: 4,
  },
  optionSubtextDark: {
    color: LIGHT_GRAY,
  },
  selectedSubtext: {
    color: WHITE_COLOR,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: THEME_COLOR,
    borderColor: THEME_COLOR,
  },
  nameInputContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: THEME_TEXT_COLOR,
    marginBottom: 8,
  },
  inputLabelDark: {
    color: WHITE_COLOR,
  },
  nameInput: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  nameInputDark: {
     backgroundColor: '#2A2A2A',
    color: WHITE_COLOR,
  },
  errorInput: {
    borderColor: ERROR_COLOR,
    borderWidth: 1,
  },
  errorText: {
    color: ERROR_COLOR,
    fontSize: 12,
    marginTop: 4,
  },
});

export default PaymentComponent;