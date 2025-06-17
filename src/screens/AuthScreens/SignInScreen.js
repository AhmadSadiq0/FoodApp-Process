import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import authStore from '../../store/AuthStore'
import CustomButton from '../../components/CustomButtom';
import InputField from '../../components/CustomInput';
import { Google_Icon } from '../../res/drawables';
import { THEME_TEXT_COLOR, BACK_GROUND, THEME_COLOR, WHITE_COLOR, GRAY_COLOR, BLACK_COLOR } from '../../res/colors';
import { SignInValidationSchema } from '../../utils/ValidationSchema';


const SignInScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const { login, loading, error } = authStore()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignIn = async (values) => {
    await login({
      identifier: values.email,
      password: values.password,
    });
  }

  const scrollToInput = (reactNode) => {
    scrollViewRef.current?.scrollToFocusedInput(reactNode);
  };

  return (
    <View style = {styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.redContainer}>
            <Image
              source={require('../../../assets/image.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.container2}>
            <View style={styles.cardTier1}>
              <Text style={styles.text1}>Create your free account</Text>
              <View style={styles.box1}>
                <Text style={styles.text2}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.text3}>Sign Up</Text>
                </Pressable>
              </View>
              {!keyboardVisible && (
                <TouchableOpacity
                  style={styles.touchable1}
                  onPress={() => alert('Go to Google')}
                >
                  <Image
                    source={Google_Icon}
                    style={styles.Googleimage}
                  />
                  <Text style={styles.text2}>Sign in with Google</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInValidationSchema}
              onSubmit={handleSignIn}
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
                  <View style={styles.inputContainer}>
                    <InputField
                      label="Email"
                      placeholder="User's email here"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      onFocus={(event) => {
                        scrollToInput(event.target);
                      }}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <InputField
                      label="Password"
                      placeholder="User's password here"
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      onFocus={(event) => {
                        scrollToInput(event.target);
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  {error?.login && (
                    <Text style={styles.errorText}>{error.login} - Please try again</Text>
                  )}
                  <CustomButton
                    title={"Sign In"}
                    onPress={handleSubmit}
                    loading={loading.login}
                  />
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  redContainer: {
    height: 250,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: WHITE_COLOR,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 20,
  },
  cardTier1: {
    width: '100%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: THEME_TEXT_COLOR,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME_TEXT_COLOR,
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME_COLOR,
    marginLeft: 10,
  },
  touchable1: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: GRAY_COLOR,
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Googleimage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'contain',
    marginRight: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: GRAY_COLOR,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: BLACK_COLOR,
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  errorText: {
    fontSize: 10,
    color: THEME_COLOR,
    alignSelf: "flex-start",
    left: 4
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
});

export default SignInScreen;