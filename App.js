import { useEffect } from "react";
import { StyleSheet , View } from "react-native";
import Navigation from "./src/navigation";
import * as Notifications from 'expo-notifications';
import { StatusBar } from "expo-status-bar";
import { Back_Ground } from "./src/res/colors";

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
      <StatusBar style="light" backgroundColor={Back_Ground}/>
     <Navigation/> 
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   paddingTop:10,
   //left:7,
  },
});
