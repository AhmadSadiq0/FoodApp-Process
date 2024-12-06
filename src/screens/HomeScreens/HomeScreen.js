import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { THEME_COLOR, THEME_TEXT_COLOR } from "../../res/colors";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Discount</Text>
        <TouchableOpacity>
          <Text style={styles.text1}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: THEME_COLOR,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 16,
    color: THEME_TEXT_COLOR,
  },
});
