import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { IMAGE29 } from "../../res/drawables";
import CustomButton from "../../components/CustomButtom";
import { useNavigation } from '@react-navigation/native'; 
import { THEME_COLOR, THEME_TEXT_COLOR, WHITE_COLOR } from "../../res/colors";
const ConfirmedOrder = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <Image source={IMAGE29} style={styles.image} />
      <Text style={styles.titleText}>Order placed successfully!</Text>
      <Text style={styles.subtitleText}>Can not be canceled now!</Text>
      <CustomButton
        title="Back To Menu"
        textStyle={{ color: THEME_COLOR }}
        style={styles.Button}
        onPress={() => {
          navigation.navigate("Menu");
        }}
      /> 
      <View style={styles.givemargin}>
        <CustomButton
          title="Back To Cart"
          backgroundColor="#EF4444"
          textColor="#FFFFFF"
          style={styles.customButton}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />  
      </View>
    </View>
  );
};
const styles = StyleSheet.create({ 
  container: {
    flex : 1,
    width: "100%",
    marginTop: 90,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#EF4444",
    marginBottom: 30,
  },
  customButton: {
    paddingHorizontal: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  givemargin: {
    marginTop:-27,
  },
  Button: {
    paddingHorizontal: 90,
    borderColor: THEME_COLOR,
    borderWidth: 2,
    borderColor: "#EF4444",
    borderRadius: 999,
    backgroundColor: WHITE_COLOR,
  },
});
export default ConfirmedOrder;