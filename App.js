import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Navigation from "./src/navigation";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { Back_Ground, THEME_COLOR } from "./src/res/colors";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor={THEME_COLOR} />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Back_Ground,
  },
});
