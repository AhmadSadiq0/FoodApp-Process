import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/CustomInput";

import {
  THEME_COLOR,
  THEME_TEXT_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
} from "../../res/colors";

const ForgetPasswordScreen = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/image.png")}
            style={styles.pizzaIcon}
          />
        </View>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission
            console.log("Form values:", values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              
              <View >
                <Text style={styles.title}>Forget password</Text>
                <Text style={styles.subtitle}>Enter your Email!</Text>
                <InputField
                  label="Email"
                  placeholder="User's email address here"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.backButton]}>
                  <Text style={styles.backButtonText}>Back To Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.nextButton]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: THEME_COLOR,
  },
  pizzaIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  formContainer: {
    flex:7,
    backgroundColor: WHITE_COLOR,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: THEME_TEXT_COLOR,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: GRAY_COLOR,
    marginBottom: 24,
  },
  errorText: {
    color: "red", // Added style for error text
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  backButtonText: {
    color: THEME_COLOR,
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: THEME_COLOR,
  },
  nextButtonText: {
    color: WHITE_COLOR,
    fontSize: 22,
    fontFamily: "Ribeye",
  },
});
export default ForgetPasswordScreen;