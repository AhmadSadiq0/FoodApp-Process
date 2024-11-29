import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View,Platform, ScrollView,
  Text, Image, TouchableOpacity, Pressable, Keyboard,
} from 'react-native';
import InputField from '../../components/CustomInput';
import { Google_Icon } from '../../res/drawables';

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.redContainer}>
          <Image
            source={require('../../../assets/image.png')} // Corrected path
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.container2}>
          <View style={styles.cardTier1}>
            <Text style={styles.text1}>Create your free account</Text>
            <View style={styles.box1}>
              <Text style={styles.text2}>Already have an account?</Text>
              <Pressable onPress={() => { alert('Sign In is pressed'); }}>
                <Text style={styles.text3}>Sign In</Text>
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
                <Text style={styles.text2}>Sign up with Google</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          <InputField
            label="Full Name"
            placeholder="User 's full name here"
            value={username}
            onChangeText={setUsername}
          />
          <InputField
            label="Email"
            placeholder="User 's email here"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label="Password"
            placeholder="User 's password here"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  redContainer: {
    flex: 3,
    backgroundColor: "red",
     justifyContent:'center'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    color: '#000',
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  text3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F63440',
    marginLeft: 10,
  },
  touchable1: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    flexDirection: 'row',
    borderRadius: 25,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: 'black',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default SignUpScreen;
