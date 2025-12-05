import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from "react-native";
import Navigation from "./src/navigation";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { Back_Ground, BLACK_COLOR, THEME_COLOR, WHITE_COLOR } from "./src/res/colors";
import useThemeStore from "./zustand/ThemeStore";
import { SafeAreaView, useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";
import { PROCESS_LOGO } from "./src/res/drawables";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function AppContent() {
  const { darkMode } = useThemeStore();
  const insets = useSafeAreaInsets();
  
  const handleProcessLink = () => {
    Linking.openURL('https://process.com.pk');
  };

  const topOffSet = insets.top + 10;

  return (
     <SafeAreaView style={[
      styles.container,
      { 
        //paddingTop: darkMode ? 25 : Constants.statusBarHeight,
        backgroundColor: darkMode ? BLACK_COLOR : Back_Ground
      }
    ]}>
      <StatusBar style={darkMode ? 'light' : 'dark'} backgroundColor={THEME_COLOR} />
      <Navigation />
      <TouchableOpacity 
        style={[styles.processLabel, { top: topOffSet, backgroundColor: THEME_COLOR }]}
        onPress={handleProcessLink}
        activeOpacity={0.7}
      >
        <Image
          source={PROCESS_LOGO}
          style={{ width: 50, height: 40, resizeMode: 'contain' }}
        />
        <Text style={[styles.processLabelText, { color: '#fff' }]}>
          Made by process
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  processLabel: {
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  processLabelText: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});


