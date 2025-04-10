import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Resources
import {
  HOME_ICON,
  MENU_ICON,
  CART_ICON,
  ORDERS_ICON,
  PROFILE_ICON,
} from '../res/drawables';
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';

// Screen Components
import {
  SignInScreen,
  SignUpScreen,
  ForgetPasswordScreen,
} from '../screens/AuthScreens';
import {
  HomeScreen,
  DealsScreen,
  ItemDetailScreen,
  SeeAllScreen,
} from '../screens/HomeScreens';
import {
  CartScreen,
  CheckOutScreen,
  OrderConfirmationScreen,
  ConfirmedOrder,
} from '../screens/CartScreens';
import {
  LanguageSettingsScreen,
  ProfileScreen,
  SettingsScreen,
  UpdateProfileScreen,
} from '../screens/ProfileScreens';
import { MenuScreen } from '../screens/MenuScreens';
import { NotificationsScreen } from '../screens/NotificationsScreens';
import { OrdersScreen } from '../screens/OrdersScreens';

// Components
import Header1 from '../components/Header1';
import Header from '../components/Header';

// Store
import authStore from '../store/AuthStore';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SignIn'>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
  </Stack.Navigator>
);

// Home Stacks
const HomeStack = () => {
  const { user } = authStore();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: () => (
            <Header
              navigation={navigation}
              user={user}
              showSearch={true}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen name="Deals" component={DealsScreen} />
    </Stack.Navigator>
  );
};

// Menu Stack
const MenuStack = () => {
  const { user } = authStore();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          header: () => (
            <Header user={user} showBellIcon={false} />
          ),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

// Cart Stack
const CartStack = () => {
  const { user } = authStore();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          header: () => (
            <Header
              navigation={navigation}
              user={user}
              showBellIcon={false}
            />
          ),
          headerShown: false,
        })}
      />
      <Stack.Screen name="CheckOut" component={CheckOutScreen} />
      <Stack.Screen
        name="ConfirmOrder"
        component={OrderConfirmationScreen}
        options={{
          header: () => (
            <Header1
              title="Order Confirmation"
              discountIcon={false}
              style={styles.header}
            />
          ),
          headerShown: true,
        }}
      />
      <Stack.Screen name="ConfirmedOrder" component={ConfirmedOrder} />
    </Stack.Navigator>
  );
};

// Orders Stack
const OrdersStack = () => {
  const { user } = authStore();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          header: () => (
            <Header
              title="My Orders"
              Welcomermsg=""
              showSearch={false}
              containerStyle={{ height: 190 }}
              textContainer={{ marginTop: 0 }}
              user={user}
              showBellIcon={false}
            />
          ),
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        header: () => <Header1 discountIcon={null} title="Settings" />,
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="LanguageSettings"
      component={LanguageSettingsScreen}
      options={{
        header: () => <Header1 discountIcon={null} title="Language Settings" />,
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {
        backgroundColor: THEME_COLOR,
        height: 50,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      headerPressColor: 'transparent',
      tabBarButton: (props) => (
        <Pressable
          {...props}
          android_ripple={{ borderless: false, color: 'transparent' }}
          style={({ pressed }) => [props.style, { opacity: pressed ? 0.7 : 1 }]}
        />
      ),
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.text}>Home</Text> : null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeTab : styles.inactiveTab}>
            <Image style={styles.image} source={HOME_ICON} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Menu"
      component={MenuStack}
      options={{
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.text}>Menu</Text> : null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeTab : styles.inactiveTab}>
            <Image style={styles.image} source={MENU_ICON} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartStack}
      options={{
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.text}>Cart</Text> : null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeTab : styles.inactiveTab}>
            <Image style={styles.image} source={CART_ICON} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersStack}
      options={{
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.text}>Orders</Text> : null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeTab : styles.inactiveTab}>
            <Image style={styles.image} source={ORDERS_ICON} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.text}>Profile</Text> : null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={focused ? styles.activeTab : styles.inactiveTab}>
            <Image style={styles.image} source={PROFILE_ICON} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

// Main Navigation Component
const Navigation = () => {
  const { user , isHydrated } = authStore();

  if(!isHydrated){
    return(
      <SplashScreen/>
    )
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="Main" component={BottomTabStack} />
            <RootStack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{
                header: () => <Header1 discountIcon={null} title="Notifications" />,
                headerShown: true,
              }}
            />
            <RootStack.Screen name="itemDetail" component={ItemDetailScreen} />
            <RootStack.Screen name="SeeAll" component={SeeAllScreen} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    height: 40,
    width: 40,
    marginTop : 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor : WHITE_COLOR
  },
  text: {
    fontSize: 10,
    color: WHITE_COLOR,
  },
  header: {
    // Add any header styles if needed
  },
});

export default Navigation;