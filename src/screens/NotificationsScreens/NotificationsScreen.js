import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
//colors
import {
    THEME_TEXT_COLOR,
    WHITE_COLOR,
    THEME_COLOR,
    GRAY_COLOR,
    BLACK_COLOR,
    Green_Color,
} from '../../res/colors';
//Images
import { PIZZAIMAGE } from '../../res/drawables';
//Button
import CustomButton from '../../components/CustomButtom';
//RawBottomSheet
import RBSheet from 'react-native-raw-bottom-sheet';
const NotificationsScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1, title: 'Your order has been confirmed!',
            message: "There is no one who loves pain itself who seeks after it and wants to have it simply because it is pain.",
            subtitle: 'Order Id:',
            code: 'AK-141124-DC807',
            date: '14/11/24',
            time: '11:08 PM',
            image: PIZZAIMAGE,
            active: false
        },
        {
            id: 2, title: 'Welcome to Ahmad’s Kitchen!',
            message: "There is no one who loves pain itself who seeks after it and wants to have it simply because it is pain.",
            subtitle: 'Enjoy your favourite meals at home!!!',
            date: '14/11/24',
            time: '11:08 PM',
            image: PIZZAIMAGE,
            active: false
        },
    ]);
    const refRBSheet = useRef(null);

    const handlePressItem = (id) => {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, active: !item.active } : { ...item, active: false }
        );
        setCartItems(updatedItems);

        const isActive = updatedItems.find(item => item.id === id && item.active);
        if (isActive) {
            refRBSheet.current?.open();
        }
    };

    const activeItem = cartItems.find((item) => item.active);

    if (cartItems.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onPressItem={handlePressItem} />
            ))}

            <RBSheet
                ref={refRBSheet}
                height={400}
                draggable={true}
                customStyles={{
                    container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE_COLOR },
                    wrapper: { backgroundColor: 'transparent' },
                    draggableIcon: { backgroundColor: '#d3d3d3' },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >
                {activeItem && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryText}>{activeItem.title}</Text>
                        <View style={styles.OrderId}>
                            <Text style={styles.summaryText2}>{activeItem.subtitle}</Text>
                            <Text style={styles.codeText}>{activeItem.code}</Text>
                        </View>
                        <Text style={styles.messageText}>{activeItem.message}</Text>
                        <View style={styles.customButton}>
                            <CustomButton title={'Go Back'} textStyle={{ color: WHITE_COLOR }} onPress={() => navigation.goBack()} />
                        </View>
                    </View>
                )}
            </RBSheet>
        </View>
    );
};

const CartItem = ({ item, onPressItem }) => {
    return (
        <TouchableOpacity
            onPress={() => onPressItem(item.id)}
            activeOpacity={0.8}
            style={[styles.cartItem, item.active && { borderColor: THEME_COLOR }]}
        >
            <Image style={styles.cartItemImage} source={item.image} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.title}</Text>
                <View style={styles.OrderId}>
                    <Text style={styles.cartServing}>{item.subtitle}</Text>
                    <Text style={styles.codeText}>{item.code}</Text>
                </View>
                <View style={styles.DateTime}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dateText}>{item.time}</Text>
                </View>
            </View>
            <View style={styles.cartItemActions}>
                <View
                    style={[styles.circle, item.active && { backgroundColor: Green_Color }]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F8F8FF",
    },
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 12,
        borderColor: WHITE_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: WHITE_COLOR,
        alignItems: 'center',
        elevation: 5,
    },
    cartItemImage: {
        width: 33,
        height: 35,
        borderRadius: 5,
        marginRight: 12,
    },
    cartItemDetails: {
        flex: 1,
    },
    OrderId: {
        flexDirection: 'row',
        justifyContent:'center',
    },
    DateTime: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
    },
    cartItemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME_TEXT_COLOR,
    },
    cartServing: {
        fontSize: 12,
        color: THEME_TEXT_COLOR,
        marginRight: 10,
    },
    codeText: {
        fontSize: 12,
        color: THEME_COLOR,
        paddingHorizontal:10,
    },
    dateText: {
        fontSize: 11,
        color: THEME_TEXT_COLOR,
        marginRight: 8,
    },
    cartItemActions: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: GRAY_COLOR,
    },
    summaryCard: {
        paddingHorizontal: 20,
    },
    summaryText: {
        fontSize: 20,
        color: THEME_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop:30,
    },
    summaryText2: {
        fontSize: 14,
        color: THEME_TEXT_COLOR,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    messageText: {
        fontSize: 14,
        color: THEME_TEXT_COLOR,
        textAlign: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: GRAY_COLOR,
        textAlign: 'center',
        marginTop: 20,
    },
    customButton: {
        marginTop: 150,
     
    },
});
export default NotificationsScreen;
