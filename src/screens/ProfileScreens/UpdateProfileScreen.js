import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import TextInputProfile from "../../components/TextInputProfile";
import ProfileHeader from "../../components/ProfileHeader";
const UpdateProfileScreen = ({ route, navigation }) => {
  const showEditIcon = route?.params?.showEditIcon || true;
  return (
    <View style={styles.container}>
      <ProfileHeader
        navigation={navigation}
        showDotsIcon={false}
        showArrowIcon={true}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInputProfile showEditIcon={showEditIcon} showButton={true} />
      </ScrollView>
    </View>
  );
};
export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
});
