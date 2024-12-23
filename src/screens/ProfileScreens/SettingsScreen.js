import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import { ARROW_ICON } from '../../res/drawables';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader 
        containerStyle={styles.headerStyle}
        textContainerStyle={styles.textContainerStyle}
        showTabsEnabled={false}
        DOTSICON={ARROW_ICON}
        icon={{ 
          height: 40, width: 40 
        }}
        Cameraicon = {{ 
          top : "88%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
});
export default SettingsScreen;
