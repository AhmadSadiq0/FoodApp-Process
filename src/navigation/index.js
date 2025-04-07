import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet , Pressable  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HOME_ICON,
    MENU_ICON,
    CART_ICON, 
    ORDERS_ICON,
    PROFILE_ICON,
    DOTS_ICON,
} from '../res/drawables';
import { THEME_COLOR, WHITE_COLOR } from '../res/colors';
//Screen Components
import {
    SignInScreen, 
    SignUpScreen,
    ForgetPasswordScreen
} from '../screens/AuthScreens/index';
import {
    HomeScreen,
    DealsScreen,
    AddItem,
    OffersScreen,
    CartsScreen
} from '../screens/HomeScreens/index';
import {
    CartScreen,
    CheckOutScreen,
    OrderConfirmationScreen,
    ConfirmedOrder
} from '../screens/CartScreens/index';
import {
    LanguageSettingsScreen,
    ProfileScreen,
    SettingsScreen,
    UpdateProfileScreen
} from '../screens/ProfileScreens/index';
import { MenuScreen } from '../screens/MenuScreens/index';
import { NotificationsScreen } from '../screens/NotificationsScreens/index';
import { OrdersScreen } from '../screens/OrdersScreens/index';
import { SplashScreen } from '../screens/SplashScreen/index';
import Header1 from '../components/Header1';
import Header from '../components/Header';
import authStore from '../store/AuthStore';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = () => { 
    
    return (
        <Stack.Navigator initialRouteName="SignUp">
            {/* <Stack.Screen options={{ headerShown: false }} name="Auth" component={SplashScreen} /> */}
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
            <Stack.Screen options={{ headerShown: false }} name="Deals" component={DealsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Menu" component={MenuScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Offers" component={OffersScreen} />
            <Stack.Screen options={{ headerShown: false }} name="CheckOut" component={CheckOutScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
            <Stack.Screen options={{ headerShown: false }} name="ConfirmOrder" component={OrderConfirmationScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Orders" component={OrdersScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
            <Stack.Screen 
                options={{ header: () => <Header1 discountIcon={null} title="Notifications" />, headerShown: true }} 
                name="Notifications" 
                component={NotificationsScreen} 
            />
            <Stack.Screen options={{ headerShown: false }} name="ForgetPassword" component={ForgetPasswordScreen} />
            {/* <Stack.Screen options={{ header : () => <Header1/>, headerShown : true }} name="Discounts" component={DiscountsScreen} /> */}
        </Stack.Navigator>
    )
}  
const HomeStack = () => {
    const {user} = authStore()
    return (
        <Stack.Navigator initialRouteName="Home" headerMode={false}>
           <Stack.Screen   name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({ 
          header: () => <Header navigation={navigation} username = {user.username} showSearch={true} />,
          headerShown: true
        })} 
      />  
            <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Deals" component={DealsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Offers" component={OffersScreen} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Notifications" component={NotificationsScreen} /> */}
            <Stack.Screen    options={{ header: () => <Header1 discountIcon={null} title="Notifications" />, headerShown: true }}  name="Notifications" component={NotificationsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Discounts" component={AddItem} />
        </Stack.Navigator>
    )
} 
const MenuStack = () => {
    const {user} = authStore()
    return (
        <Stack.Navigator initialRouteName="Menu" headerMode={false}>
            {/* <Stack.Screen options={{ headerShown: false }} name="Menu" component={MenuScreen} /> */}
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    header: () => <Header username={user.username} showBellIcon={false} />,
                }}
            />
            <Stack.Screen options={{ headerShown: false }} name="Notifcations" component={NotificationsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="AddItem" component={AddItem} />
        </Stack.Navigator>
    )
}
  const CartStack = ({navigation}) => {
    const {user} = authStore()
    return (
        <Stack.Navigator initialRouteName="Cart" headerMode={false}>
               <Stack.Screen
                name="Cart" 
                component={CartScreen}
                options={{
                    header: () => <Header navigation={navigation} username={user.username} showBellIcon={false} />
                }}
            />
           {/* <Stack.Screen options={{  headerShown : false }}name="Cart" component={CartScreen} /> */}
           {/* <Stack.Screen options={{ header : () => <Header />, headerShown : true }}name="Cart" component={CartScreen} /> */}
            <Stack.Screen options={{ headerShown: false }} name="CheckOut" component={CheckOutScreen} />       
            {/* <Stack.Screen options={{ headerShown: false }} name="ConfirmOrder" component={OrderConfirmationScreen} /> */}
            <Stack.Screen 
  name="ConfirmOrder" 
  component={OrderConfirmationScreen} 
  options={{
    header: () => <Header1 title="Order Confirmation" discountIcon={false} style={styles.header} />
  }} 
/>

            <Stack.Screen options={{ headerShown: false }} name="Notifcations" component={NotificationsScreen} />
            <Stack.Screen options={{ headerShown: false }} name="ConfirmedOrder" component={ConfirmedOrder} />
        </Stack.Navigator>
    )
}  
const OrdersStack = () => {
    const {user} = authStore()
    return (
        <Stack.Navigator initialRouteName="Orders" headerMode={false}>
            {/* <Stack.Screen options={{ headerShown: false }} name="Orders" component={OrdersScreen} /> */}
            <Stack.Screen 
  name="Orders" 
  component={OrdersScreen} 
  options={{
    header: () => (
      <Header
        title="My Orders"
        Welcomermsg=""
        showSearch={false}
        showShadow={true}
        containerStyle={{
          height: 190,
        }}
        textContainer={{
          marginTop: 0,
        }}  
        username={user.username}
        showBellIcon={false}
      />
    ),
  }} 
/>

            <Stack.Screen options={{ headerShown: false }} name="Notifcations" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}
const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" headerMode={false}>
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
            <Stack.Screen options={{ headerShown: false }} name="UpdateProfile" component={UpdateProfileScreen} /> 
            <Stack.Screen   options={{ header: () => <Header1 discountIcon={null} title="Notifications" />, headerShown: true }} name="Settings" component={SettingsScreen} />
            <Stack.Screen  options={{ header: () => <Header1 discountIcon={null} title="Notifications" />, headerShown: true }} name="LanguageSettings" component={LanguageSettingsScreen} />
            <Stack.Screen    options={{ header: () => <Header1 discountIcon={null} title="Notifications" />, headerShown: true }}  name="Notifcations" component={NotificationsScreen} />
        </Stack.Navigator> 
    )
}
function BottomTabStack() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: THEME_COLOR,
                    height: 50,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                headerPressColor : 'transparent',
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        android_ripple={{ borderless: false, color: 'transparent' }}
                        style={({ pressed }) => [
                            props.style,
                            { opacity: pressed ? 0.7 : 1 },
                        ]}
                    />
                ),
            }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        focused ? <Text style={styles.text}>Home</Text> : null
                    ),
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={focused ? styles.activeTab : styles.inactiveTab}>
                            <Image
                                style={styles.image}
                                source={HOME_ICON}
                            />
                        </View>
                    ),
                }}
            />
                {/* <Tab.Screen
                    name= "Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            focused ? <Text style={styles.text}>Home</Text> : null
                        ),
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                                <Image 
                                    style={styles.image}
                                    source={HOME_ICON} 
                                />
                            </View>
                        ),
                    }}
                /> */}
                <Tab.Screen
                    name="Menu"
                    component={MenuStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            focused ? <Text style={styles.text}>Menu</Text> : null
                        ),
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                                <Image 
                                    style={styles.image}
                                    source={MENU_ICON} 
                                />
                            </View>
                        ),
                    }}
                /> 
                <Tab.Screen
                    name="Cart"
                    component={CartStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            focused ? <Text style={styles.text}>Cart</Text> : null
                        ),
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                                <Image 
                                    style={styles.image}
                                    source={CART_ICON} 
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Orders"
                    component={OrdersStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            focused ? <Text style={styles.text}>Orders</Text> : null
                        ),
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                                <Image 
                                    style={styles.image}
                                    source={ORDERS_ICON} 
                                />
                            </View>
                        ),
                    }}
    
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            focused ? <Text style={styles.text}>Profile</Text> : null
                        ),
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                                <Image 
                                    style={styles.image}
                                    source={PROFILE_ICON} 
                                />
                            </View>
                        ),
                    }}
    
                />
            </Tab.Navigator>
        );
}
function Navigation(props) {
    const {user} = authStore()
    
    return (
        <NavigationContainer options={{ headerShown: false }}>
                {
                    user ?
                    <BottomTabStack /> :
                    <AuthStack/>
                }
                {/* <Stack.Navigator initialRouteName={"MainStack"} headerMode={false}>
                    <Stack.Screen options={{ headerShown: false }} name="MainStack" component={AuthStack} />
                </Stack.Navigator> */}
        </NavigationContainer >
    );
}
export default Navigation;
const styles = StyleSheet.create({
    activeTab: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    inactiveTab: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: THEME_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 12,
        color: WHITE_COLOR
    }
})
