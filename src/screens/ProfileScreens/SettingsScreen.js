// import React, { useState } from "react";
// import { View, Text, StyleSheet, Switch } from "react-native";
// //customButton
// import { CustomButton } from "../../components";
// //State Manage
// import useThemeStore from "../../../zustand/ThemeStore";
// //colors
// import { THEME_COLOR, GRAY_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR } from "../../res/colors";

// const SettingScreen = () => {
//   const { darkMode, toggleDarkMode } = useThemeStore();
//   const [tempDarkMode, setTempDarkMode] = useState(darkMode);

//   const handleSave = () => {
//     if (tempDarkMode !== darkMode) {
//       toggleDarkMode();
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: tempDarkMode ? BLACK_COLOR : Back_Ground }]}>
//       <View style={styles.toggleContainer}>
//         <Text style={[styles.label, { color: THEME_COLOR }]}>Dark Mode</Text>
//         <Switch
//           trackColor={{ false: GRAY_COLOR, true: THEME_COLOR }}
//           thumbColor={THEME_COLOR}
//           ios_backgroundColor={GRAY_COLOR}
//           onValueChange={setTempDarkMode}
//           value={tempDarkMode}
//         />
//       </View>
//       <CustomButton style={styles.saveButton} title="Save" onPress={handleSave} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: WHITE_COLOR,
//     paddingTop:10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     width: "100%",
//     elevation: 5,

//   },
//   toggleContainerDark: {
//     backgroundColor: GRAY_COLOR,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   switch: {
//     transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
//   },
//   button: {
//     // paddingHorizontal: 15,
//     // borderRadius: 25,
//     // width: "100%",
//     // alignItems: "center",
//     // height: 50,
//     // backgroundColor: THEME_COLOR,
//   }, 
// });

// export default SettingScreen;
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
//customButton
import { CustomButton } from "../../components";
//State Manage
import useThemeStore from "../../../zustand/ThemeStore";
//colors
import { THEME_COLOR, GRAY_COLOR, WHITE_COLOR, THEME_TEXT_COLOR, Back_Ground, BLACK_COLOR, DARK_THEME_TEXT_COLOR } from "../../res/colors";
// Translation
import { t } from '../../components/i18n';

const SettingScreen = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [tempDarkMode, setTempDarkMode] = useState(darkMode);

  const handleSave = () => {
    if (tempDarkMode !== darkMode) {
      toggleDarkMode();
    }
  };

  const dynamicThemeColor = darkMode ? WHITE_COLOR : THEME_COLOR;
  const dynamicTextColor = darkMode ? DARK_THEME_TEXT_COLOR : THEME_TEXT_COLOR;

  return (
    <View style={[styles.container, { backgroundColor: tempDarkMode ? BLACK_COLOR : Back_Ground }]}>
      <View style={[styles.toggleContainer, { backgroundColor: darkMode ? BLACK_COLOR : WHITE_COLOR }]}>
        <Text style={[styles.label, { color: dynamicTextColor }]}>{t('settings.darkMode')}</Text>
        <Switch
          trackColor={{ false: GRAY_COLOR, true: THEME_COLOR }}
          thumbColor={THEME_COLOR}
          ios_backgroundColor={GRAY_COLOR}
          onValueChange={setTempDarkMode}
          value={tempDarkMode}
        />
      </View>
      <CustomButton 
        style={[styles.saveButton, { backgroundColor: THEME_COLOR }]} 
        title={t('common.save')} 
        onPress={handleSave} 
        textStyle={{ color: WHITE_COLOR }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  backgroundColor: Back_Ground,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 25,
    width: "100%",
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default SettingScreen;
