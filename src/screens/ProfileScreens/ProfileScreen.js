import React from 'react'
import { 
    StyleSheet, 
    View ,
    ScrollView
} from 'react-native'
import ProfileHeader from '../../components/ProfileHeader'
import TextInputProfile from '../../components/TextInputProfile'
import { Back_Ground } from '../../res/colors'
const ProfileScreen = (props) => {
  const { navigation, route } = props;
  const showEditIcon = route?.params?.showEditIcon || false;
  return (
    <View style={styles.container}>
      <ProfileHeader
        navigation={navigation}
        showDotsIcon={true}
        showArrowIcon={false}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInputProfile showEditIcon={showEditIcon} showButton={false} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Back_Ground, 
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
export default ProfileScreen;
