import React from 'react';
import { 
    StyleSheet, 
    View 
} from 'react-native';
import Header1 from '../../components/Header1';

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Header1
                discountIcon={null} 
                title="Notifications"
                containerStyle={{ backgroundColor: 'red', height: 150 }}
                headerTextStyle={{ marginBottom: 10 }} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NotificationsScreen;
