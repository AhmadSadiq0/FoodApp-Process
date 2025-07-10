import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Navigation from "./src/navigation";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { Back_Ground, BLACK_COLOR, THEME_COLOR } from "./src/res/colors";
import useThemeStore from "./zustand/ThemeStore";
import { SafeAreaView } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const { darkMode } = useThemeStore();
  return (
     <SafeAreaView style={[
      styles.container,
      { 
        paddingTop: darkMode ? 25 : Constants.statusBarHeight,
        backgroundColor: darkMode ? BLACK_COLOR : Back_Ground
      }
    ]}>
      <StatusBar style={darkMode ? 'light' : 'dark'} backgroundColor={THEME_COLOR} />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
