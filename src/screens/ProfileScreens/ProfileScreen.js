import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Back_Ground, THEME_COLOR, WHITE_COLOR, THEME_TEXT_COLOR } from '../../res/colors';
import { SECONDARY_PROFILE_AVATAR } from '../../res/drawables';
import PersonalDetails from '../../components/PersonalDetails';
import useAuthStore from '../../store/AuthStore';

const ProfileScreen = () => {
  const { user } = useAuthStore();
  console.log(user)
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity>
              <Image 
                source={SECONDARY_PROFILE_AVATAR}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.badge} />
          </View>
          <Text style={styles.name}>{user?.username || 'Guest'}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
        </View>
      </View>

      <PersonalDetails />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: Back_Ground,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    borderWidth: 4,
    borderColor: THEME_COLOR, // Using theme color for border
    borderRadius: 100,
    padding: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  badge: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: WHITE_COLOR,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: THEME_TEXT_COLOR,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLOR,
  },
});
export default ProfileScreen;