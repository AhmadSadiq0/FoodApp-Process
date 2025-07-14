import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
//colors
import {
    THEME_TEXT_COLOR,
    WHITE_COLOR,
    THEME_COLOR,
    BLACK_COLOR,
    Green_Color,
    Back_Ground,
} from '../../res/colors';
//Images
import { NOTIFICATION_ICON, BACK_ICON, SAD_ICON2 } from '../../res/drawables';
//RawBottomSheet
import RBSheet from 'react-native-raw-bottom-sheet';
//Store
import useNotificationStore from '../../store/NotificationStore';
import useAuthStore from '../../store/AuthStore';
// Button
import ImageButton from '../../components/ImageButton';
// Theme Store
import useThemeStore from '../../../zustand/ThemeStore';

const NotificationsScreen = ({ navigation }) => {
    const { notifications, fetchNotifications, unreadCount, loading, markNotificationAsRead } = useNotificationStore();
    const { darkMode } = useThemeStore();
    const { user, isHydrated } = useAuthStore();
    const currentUserId = user?._id;
    const [selectedNotification, setSelectedNotification] = useState(null);
    const refRBSheet = useRef(null);

    useEffect(() => {
        const loadNotifications = async () => {
            await fetchNotifications();
        };
        loadNotifications();
    }, []);

    useEffect(() => {
        const updateUnreadCount = async () => {
            if (!notifications || notifications.length == 0) return;

            const results = await Promise.allSettled(
                notifications.map((notification) => {
                    const recipient = notification.recipients?.find(r => r.userId == currentUserId);
                    if (recipient && !recipient.seen) {
                        return markNotificationAsRead(notification._id);
                    }
                    return Promise.resolve({ status: 'fulfilled' });
                })
            );
        };

        updateUnreadCount();
    }, []);


    const transformedNotifications = notifications.map((notification) => {

        const recipient = notification.recipients && notification.recipients.find(r => r.userId == currentUserId);
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
            image: NOTIFICATION_ICON,
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

    const dynamicStyles = {
        container: {
            backgroundColor: darkMode ? BLACK_COLOR : Back_Ground,
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        notificationItem: {
            borderColor: darkMode ? '#333' : WHITE_COLOR,
            backgroundColor: darkMode ? '#222' : WHITE_COLOR,
        },
        textColor: {
            color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR,
        },
        summaryContainer: {
            backgroundColor: darkMode ? '#222' : WHITE_COLOR,
        },
        badge: {
            backgroundColor: darkMode ? '#444' : '#F5F5F5',
        }
    };

    const getMergedStyles = (styleName) => {
        return {
            ...dynamicStyles[styleName],
        };
    };

    if (!isHydrated || loading) {
        return (
            <View style={getMergedStyles('container')}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
            </View>
        );
    }

    if (transformedNotifications.length === 0) {
        return (
            <View style={getMergedStyles('container')}>
                <Image source={SAD_ICON2} style={styles.emptyIcon} />
                <Text style={[styles.emptyCartText, dynamicStyles.textColor]}>
                    Your Notifications is empty
                </Text>
            </View>
        );
    }

    return (
        <View style={getMergedStyles('container')}>
            <View style={styles.headerRow}>
                <ImageButton
                    imageSource={BACK_ICON}
                    onPress={() => navigation.goBack()}
                    tintColor={darkMode ? WHITE_COLOR : undefined}
                />
                <Text style={[styles.headerTitle, dynamicStyles.textColor]}>Notifications</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {transformedNotifications.map((item) => (
                    <NotificationItem
                        key={item.id}
                        item={item}
                        onPressItem={handlePressItem}
                        darkMode={darkMode}
                    />
                ))}
            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                height={210}
                draggable={true}
                customStyles={{
                    container: {
                        ...styles.summaryContainer,
                        backgroundColor: darkMode ? '#222' : WHITE_COLOR,
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        padding: 18,
                        ...(darkMode && { // Only apply these borders when darkMode is true
                            borderTopWidth: 3,
                            borderLeftWidth: 3,
                            borderRightWidth: 3,
                            borderColor: THEME_COLOR, // Use white border in dark mode
                        }),
                    },
                    wrapper: { backgroundColor: 'rgba(0,0,0,0.2)' },
                    draggableIcon: { backgroundColor: darkMode ? WHITE_COLOR : BLACK_COLOR },
                }}
            >
                {selectedNotification && (
                    <View style={styles.summaryCard}>
                        <Text style={[styles.summaryText, dynamicStyles.textColor]}>
                            {selectedNotification.title}
                        </Text>
                        <View style={styles.OrderIdSheet}>
                            <Text style={[styles.summaryText2, dynamicStyles.textColor]}>
                                {selectedNotification.subtitle}
                            </Text>
                            <View style={styles.badgeSheet}>
                                <Text style={styles.codeText1}>{selectedNotification.code}</Text>
                            </View>
                        </View>
                        <Text style={[styles.messageText, dynamicStyles.textColor]}>
                            {selectedNotification.message}
                        </Text>
                    </View>
                )}
            </RBSheet>
        </View>
    );
};

const NotificationItem = ({ item, onPressItem, darkMode }) => {
    return (
        <TouchableOpacity
            onPress={() => onPressItem(item.id)}
            activeOpacity={0.85}
            style={[
                styles.notificationItem,
                {
                    borderColor: darkMode ? '#333' : WHITE_COLOR,
                    backgroundColor: darkMode ? '#222' : WHITE_COLOR,
                },
                item.active && { borderColor: THEME_COLOR, shadowColor: THEME_COLOR },
                !item.seen && styles.unreadCard,
            ]}
        >
            <Image
                style={styles.notificationItemImage}
                source={item.image}
                tintColor={THEME_COLOR}
            />
            <View style={styles.notificationItemDetails}>
                <Text style={[styles.notificationItemName, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>
                    {item.title}
                </Text>
                <View style={styles.OrderId}>
                    <Text style={[styles.cartServing, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>
                        {item.subtitle}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: darkMode ? '#444' : '#F5F5F5' }]}>
                        <Text style={styles.codeText}>{item.code}</Text>
                    </View>
                </View>
                <View style={styles.DateTimeRow}>
                    <Text style={[styles.dateText, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>
                        {item.date}
                    </Text>
                    <Text style={[styles.dateText, { color: darkMode ? WHITE_COLOR : THEME_TEXT_COLOR }]}>
                        {item.time}
                    </Text>
                </View>
            </View>
            <View style={styles.notificationItemActions}>
                {!item.seen && <View style={styles.circle} />}
            </View>
        </TouchableOpacity>
    );
};

// Static styles (colors that change are handled dynamically)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        elevation: 2,
        margin: 1,
        width: '90%',
    },
    unreadCard: {

    },
    notificationItemImage: {
        width: 30,
        height: 30,
        borderRadius: 8,
        marginRight: 16,
    },
    notificationItemDetails: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
    },
    OrderId: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    badge: {
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 6,
    },
    badgeSheet: {
        backgroundColor: THEME_COLOR,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginLeft: 8,
    },
    DateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 8,
    },
    notificationItemName: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    cartServing: {
        fontSize: 13,
        marginRight: 6,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    codeText: {
        fontSize: 13,
        color: WHITE_COLOR,
        textAlign: 'center',
        alignSelf: 'center',
    },
    codeText1: {
        fontSize: 13,
        color: WHITE_COLOR,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 12,
        marginRight: 8,
        textAlign: 'left',
    },
    notificationItemActions: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 10,
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Green_Color,
    },
    summaryCard: {
        paddingHorizontal: 10,
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
    },
    summaryText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        width: '100%',
    },
    summaryText2: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 0,
        textAlign: 'center',
        width: 'auto',
    },
    OrderIdSheet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    messageText: {
        fontSize: 15,
        textAlign: 'center',
        width: '100%',
        marginTop: 10,
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 18,
        width: '100%',
    },
    emptyIcon: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 10,
        alignSelf: 'center',
    },
    headerRow: {
        paddingTop: 15,
        left: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        flex: 1,
        textAlign: 'left',
        width: '100%',
    },
    scrollContent: {
        paddingBottom: 30,
        width: '100%',
        alignSelf: 'center',
    },
    summaryContainer: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 18,
    },
});

export default NotificationsScreen;