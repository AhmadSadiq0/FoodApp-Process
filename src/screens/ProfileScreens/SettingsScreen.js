import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import CustomButton from "../../components/CustomButtom";
import { Back_Ground, GRAY_COLOR, THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from "../../res/colors";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, isDarkMode && styles.labelActive]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: GRAY_COLOR, true: GRAY_COLOR }}
          thumbColor={isDarkMode ? THEME_TEXT_COLOR : THEME_TEXT_COLOR}
          ios_backgroundColor={THEME_COLOR}
          onValueChange={toggleSwitch}
          value={isDarkMode}
          style={styles.switch}
        />
      </View>
      <CustomButton title={"Save"} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Back_Ground,
    flex: 1,
    justifyContent: "space-between", 
    paddingHorizontal: 16,
    paddingVertical: 20, 
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    elevation: 5, 
  },
  
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: THEME_COLOR,
  },
  labelActive: {
    color: THEME_TEXT_COLOR,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    backgroundColor: THEME_COLOR,
    height:50

  },
});

export default App;
