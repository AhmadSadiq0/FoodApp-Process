import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SECONDARY_PROFILE_AVATAR } from '../../res/drawables';
import PersonalDetails from '../../components/PersonalDetails';
import useAuthStore from '../../store/AuthStore';

const ProfileScreen = () => {
  const { user } = useAuthStore();
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Header */}
        {/* <View style={styles.header}> */}
          {/* <TouchableOpacity>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity accessibilityLabel="Settings"> */}
            {/* <FontAwesome5 name="cog" size={20} color="#000" /> */}
          {/* </TouchableOpacity>
        </View> */}

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity>
                             <Image 
                              source={SECONDARY_PROFILE_AVATAR}
                               style={[
                                 styles.icon,
                               ]} 
                             />
                           </TouchableOpacity>
            <View style={styles.badge} />
          </View>
          <Text style={styles.name}>{user?.username || 'Guest'}</Text>
          {/* <Text style={styles.memberStatus}>Gold Member</Text> */}
        </View>
      </View>
      <PersonalDetails/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    flex: 1,
    //  backgroundColor: '#ffffff',
    padding: 16,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 320, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  doneText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '400',
  },
  headerTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Offset center due to buttons
  },
  profileSection: {
    paddingTop: 34,
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',

  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    backgroundColor: '#facc15', // Tailwind's yellow-400
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  memberStatus: {
    fontSize: 14,
    fontWeight: '400',
    color: '#facc15',
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 120,
    height: 120,
  },
});

export default ProfileScreen;
