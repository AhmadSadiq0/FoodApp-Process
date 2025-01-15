import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
//component
import {ProfileHeader,TextInputProfile} from '../../components';
//State Manage
import useThemeStore from '../../../zustand/ThemeStore'; 
//colors
import { Back_Ground, BLACK_COLOR } from '../../res/colors'; 

const ProfileScreen = (props) => {
  const { navigation, route } = props;

  const { darkMode } = useThemeStore();


  const showEditIcon = route?.params?.showEditIcon || false;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? BLACK_COLOR : Back_Ground } 
      ]}
    >
    
      <ProfileHeader navigation={navigation} showDotsIcon={true} showArrowIcon={false} />
      

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInputProfile showEditIcon={showEditIcon} showButton={false} />
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
