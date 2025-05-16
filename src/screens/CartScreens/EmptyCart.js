
import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Frown } from 'lucide-react-native';
import { THEME_COLOR, WHITE_COLOR, INPUT_BACK_COLOR, BLACK_COLOR } from '../../res/colors';
import { CustomButton } from '../../components';
import useThemeStore from '../../../zustand/ThemeStore';

const EmptyCart = ({ navigation }) => {
  const { darkMode } = useThemeStore(); 
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ translateY: bounceAnim }] },
        ]}
      >
        <Frown
          size={120}
          color={THEME_COLOR} 
          strokeWidth={1.5}
        />
      </Animated.View>

      <Text style={[styles.title, darkMode && styles.darkText]}>Your cart is empty</Text>
      <Text style={[styles.subtitle, darkMode && styles.darkText]}>
        Looks like you haven't added anything yet.
      </Text>
      <Text style={[styles.message, darkMode && styles.darkText]}>
        Browse our delicious menu and add some mouth-watering dishes!
      </Text>
      <CustomButton
        title="Browse Menu"
        onPress={() => navigation.navigate('Menu')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
     backgroundColor: INPUT_BACK_COLOR,  
  },
  darkContainer: {
    backgroundColor: BLACK_COLOR,  // Dark background
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: THEME_COLOR,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: THEME_COLOR,
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 16,
    color: THEME_COLOR,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
  },
  darkText: {
    color: WHITE_COLOR,  // White text for dark mode
  },
  button: {
    marginTop: 24,
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
  },
});

export default EmptyCart;