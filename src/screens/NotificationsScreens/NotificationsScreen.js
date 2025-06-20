import React, { useRef, useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
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
    Back_Ground,
} from '../../res/colors';
//Images
import { ARROW_ICON, PIZZAIMAGE } from '../../res/drawables';
//Button
import CustomButton from '../../components/CustomButtom';
//RawBottomSheet
import RBSheet from 'react-native-raw-bottom-sheet';
import useNotificationStore from '../../store/NotificationStore';

const NotificationsScreen = ({ navigation }) => {
    const { notifications, fetchNotifications, unreadCount, loading } = useNotificationStore();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const refRBSheet = useRef(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        console.log('Raw notifications from store:', notifications);
        console.log('Transformed notifications:', transformedNotifications);
    }, [notifications]);

    // Transform API notifications to UI format
    const transformedNotifications = notifications.map((notification, index) => {
        const recipient = notification.recipients && notification.recipients[0];
        const date = new Date(notification.createdAt);
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });

        return {
            id: notification._id,
            title: notification.type === 'order-update' ? 'Order Update' : 'Notification',
            message: notification.description,
            subtitle: 'Order Id:',
            code: notification.description.match(/#([A-Z0-9]+)/)?.[1] || 'N/A',
            date: formattedDate,
            time: formattedTime,
            image: PIZZAIMAGE,
            active: false,
            seen: recipient ? recipient.seen : false
        };
    });

    const handlePressItem = (id) => {
        const updatedItems = transformedNotifications.map((item) =>
            item.id === id ? { ...item, active: !item.active } : { ...item, active: false }
        );
        
        const isActive = updatedItems.find(item => item.id === id && item.active);
        if (isActive) {
            const selectedItem = updatedItems.find(item => item.id === id);
            setSelectedNotification(selectedItem);
            refRBSheet.current?.open();
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                   <ActivityIndicator size="large" color={THEME_COLOR} />
                {/* <Text style={styles.emptyCartText}>Loading notifications...</Text> */}
            </View>
        );
    }

    if (transformedNotifications.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyCartText}>Your Notifications is empty</Text>
            </View>
        );
    } 

    return (
        <View style={styles.container}>
            {transformedNotifications.map((item) => (
                <CartItem key={item.id} item={item} onPressItem={handlePressItem} />
            ))} 
            <RBSheet
                ref={refRBSheet}
                height={400}
                draggable={true}
                customStyles={{
                    container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: WHITE_COLOR },
                    wrapper: { backgroundColor: 'transparent' },
                    draggableIcon: { backgroundColor:BLACK_COLOR },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >
                {selectedNotification && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryText}>{selectedNotification.title}</Text>
                        <View style={styles.OrderId}>
                            <Text style={styles.summaryText2}>{selectedNotification.subtitle}</Text>
                            <Text style={styles.codeText}>{selectedNotification.code}</Text>
                        </View>
                        <Text style={styles.messageText}>{selectedNotification.message}</Text>
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
                    style={[styles.circle, !item.seen && { backgroundColor: Green_Color }]}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 16,
        paddingTop:30,
        backgroundColor: Back_Ground,
     
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
        color: THEME_TEXT_COLOR,
        textAlign: 'center',
        marginTop:"100%",
       
    },
    customButton: {
        marginTop: 150,
     
    },
});
export default NotificationsScreen;

