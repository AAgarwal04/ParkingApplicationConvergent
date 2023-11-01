import { View, Text, StyleSheet, Button, Pressable } from "react-native";

const Signin = () => {
  return (
    <View className="Signin" style={styles.container}>
      <Text>Welcome</Text>
      <Text>Login:</Text>
      <Text>Password:</Text>
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

export default Signin;
