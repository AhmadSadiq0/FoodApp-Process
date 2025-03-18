
import React from 'react';
//core component
import { StyleSheet, View, ScrollView } from 'react-native';
// Components
import { ProfileHeader, TextInputProfile } from '../../components';
// State Management
import useThemeStore from '../../../zustand/ThemeStore'; 
import useAuthStore from '../../store/AuthStore';
// Colors
import { Back_Ground, BLACK_COLOR } from '../../res/colors';


const ProfileScreen = (props) => {

  const { user } = useAuthStore();
  const { navigation, route } = props;
  const { darkMode } = useThemeStore();

  const showEditIcon = route?.params?.showEditIcon || false;
  const showButton = route?.params?.showButton || false;

  console.log("user",user)
  if (!user) {

    return <Text>Loading...</Text>;

  }

  return (
    
    <View style={[styles.container, { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground }]}>
      <ProfileHeader navigation={navigation} showDotsIcon={true} showArrowIcon={false} title={user?.username || "User"}/>
    
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}> 
        <TextInputProfile 
          showEditIcon={showEditIcon} 
          showButton={false}
          // fullName={user?.username || 'N/A'} 
          username={user?.username || 'N/A'}
          email={user?.email || ''} 
          phoneNo={user?.phone || 'N/A'} 
          address={user?.address || 'N/A'} 
          debitCardDetail={'N/A'} 
          password={user?.password || 'N/A'}
        />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});

export default ProfileScreen;
