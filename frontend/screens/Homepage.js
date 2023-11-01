import { Navbar } from "../Navbar";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

const Homepage = () => {
  return (
    <View className="Homepage" style={styles.container}>
      <Text>THIS IS THE HOME PAGE</Text>
      <Text>There will be a map here WIP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
  body: {
    fontSize: 24,
    fontWeight: "200",
    color: "white",
  },
});

export default Homepage;
