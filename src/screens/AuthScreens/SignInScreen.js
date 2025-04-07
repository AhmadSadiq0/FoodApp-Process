import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authStore from '../../store/AuthStore'
import CustomButton from '../../components/CustomButtom';
import InputField from '../../components/CustomInput';
import { Google_Icon } from '../../res/drawables';
import { THEME_TEXT_COLOR,BACK_GROUND ,THEME_COLOR,WHITE_COLOR,GRAY_COLOR,BLACK_COLOR} from '../../res/colors';
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const SignInScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [signInResponse, setSignInResponse] = useState(null); 
  const {login} = authStore()
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
  const handleSignIn=async(values)=>{
    console.log('Sign Up Values:', values);
    const response =  await login({
      identifier: values.email,
      password: values.password,
    });
    console.log('Sign In Response:', response);
    setSignInResponse(response);
  }
  
  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
              <Pressable onPress={() => { alert('Sign Up is pressed'); }}>
                <Text style={styles.text3}>Sign Up</Text>
              </Pressable>
            </View>
            {!isKeyboardVisible ? (
              <TouchableOpacity
                style={styles.touchable1}
                onPress={() => { alert('Go to Google'); }}
              >
                <Image
                  source={Google_Icon}
                  style={styles.Googleimage}
                />
                <Text style={styles.text2}>Sign in with Google</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          <Formik initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSignIn(values)
            }}>
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
                  placeholder="User 's email here"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                </View>
                <View style={styles.inputContainer}> 
                <InputField
                  label="Password"
                  placeholder="User 's password here"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                </View>
                <CustomButton
                  title={"SignIn"}
                  onPress={handleSubmit}
                />
                </View>
                 )}
              </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACK_GROUND,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  redContainer: {
    flex: 3,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
  },
  container2: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: WHITE_COLOR,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    marginVertical: 15,
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
    fontSize: 12,
    color: THEME_COLOR,
    marginTop: 5,
    alignSelf: "flex-start",
    // marginBottom: 10,
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