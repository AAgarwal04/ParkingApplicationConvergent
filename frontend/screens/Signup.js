import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (username && email && password) {
      navigation.replace("Login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 20 }}>
        <Text>Logo</Text>
      </View>

      <View style={{ marginBottom: 20, width: "80%" }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{ borderBottomWidth: 1, paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          style={{ borderBottomWidth: 1, paddingVertical: 10, marginTop: 10 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={{ borderBottomWidth: 1, paddingVertical: 10, marginTop: 10 }}
        />
      </View>

      <View style={{ marginBottom: 20, width: "80%" }}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
