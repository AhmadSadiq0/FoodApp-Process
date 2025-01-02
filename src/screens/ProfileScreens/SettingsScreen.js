import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import CustomButton from "../../components/CustomButtom";
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
          trackColor={{ false: "#E5E5E5", true: "#E5E5E5" }}
          thumbColor={isDarkMode ? "#4B0082" : "#E5E5E5"}
          ios_backgroundColor="#E5E5E5"
          onValueChange={toggleSwitch}
          value={isDarkMode}
          style={styles.switch}
        />
      </View>
      <CustomButton title={"UpdateProfile"} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 25,
    width: "97%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "red",
    marginRight: 10,
  },
  labelActive: {
    color: "#4B0082",
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  button: {
    padding: 15,
    marginBottom: 100,
    borderRadius: 25,
    marginTop: 450,
    width: "97%",
    alignItems: "center",
    backgroundColor: "#4B0082",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default App;