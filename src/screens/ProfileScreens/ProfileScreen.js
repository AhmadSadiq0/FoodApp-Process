import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Back_Ground, THEME_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, BLACK_COLOR } from '../../res/colors';
import { SECONDARY_PROFILE_AVATAR } from '../../res/drawables';
import PersonalDetails from '../../components/PersonalDetails';
import useAuthStore from '../../store/AuthStore';
import useThemeStore from '../../../zustand/ThemeStore';

const ProfileScreen = () => {
  const { user } = useAuthStore();
  const { darkMode } = useThemeStore();

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.card, darkMode && styles.darkCard]}>
        <View style={styles.profileSection}>
          <View style={[styles.avatarWrapper, darkMode && styles.darkAvatarWrapper]}>
            <TouchableOpacity>
              <Image 
                source={SECONDARY_PROFILE_AVATAR}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.badge} />
          </View>
          <Text style={[styles.name, darkMode && styles.darkText]}>{user?.username || 'Guest'}</Text>
          <Text style={[styles.email, darkMode && styles.darkThemeText]}>{user?.email || 'guest@example.com'}</Text>
        </View>
      </View>
      <PersonalDetails darkMode={darkMode} />
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
  darkContainer: {
    backgroundColor: BLACK_COLOR,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: WHITE_COLOR,
  },
  darkCard: {
    backgroundColor: BLACK_COLOR,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    borderWidth: 4,
    borderColor: THEME_COLOR,
    borderRadius: 100,
    padding: 4,
    backgroundColor: WHITE_COLOR,
  },
  darkAvatarWrapper: {
    backgroundColor: BLACK_COLOR,
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
  darkText: {
    color: WHITE_COLOR,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: THEME_COLOR,
  },
  darkThemeText: {
    color: THEME_COLOR,
  },
});

export default ProfileScreen;