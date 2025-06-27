import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { LIGHT_GRAY, DARK_GRAY , THEME_TEXT_COLOR , WHITE_COLOR, THEME_COLOR, BLACK_COLOR} from '../res/colors';


const InputFieldAddress = ({ label, value, onChange, error, darkMode, ...props }) => (
  <View style={[styles.inputContainer, props.containerStyle]}>
    <Text style={[styles.inputLabel, darkMode && styles.inputLabelDark]}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        darkMode && styles.inputDark,
        error && styles.errorInput
      ]}
      value={value}
      onChangeText={onChange}
      placeholderTextColor={darkMode ? LIGHT_GRAY : DARK_GRAY}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
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
        borderColor: THEME_COLOR,
        borderWidth: 1,
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

});

export default InputFieldAddress;