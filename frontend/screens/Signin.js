import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    if (email && password) {
      navigation.replace("Main");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "10%", marginBottom: "-25%" }}>
        <Image
          style={{ transform: [{ scale: 0.25 }] }}
          source={require("../assets/logo_blue.png")}
        />
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View style={{ width: "100%", alignItems: "center"}}>
        <TouchableOpacity onPress={handleSignin} style={styles.loginButton}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <Text style={{ marginHorizontal: 10 }}>OR</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Login with Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    alignItems: "center",
  },
  input: {
    borderColor: "#e2e2e2",
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    margin: "4%",
    padding: "5%",
    backgroundColor: "#ffffff",
  },
  loginButton: {
    backgroundColor: "#4886ff",
    width: "85%",
    borderRadius: 10,
    padding: "5%",
  },
});

export default Signin;
