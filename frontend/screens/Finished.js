import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Finished = ({ navigation }) => {
  const onNext = () => {
    navigation.replace("Main");
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFC",
        height: "100%",
      }}
    >
      <FontAwesome5 name="check-circle" size={150} color="#4886FF" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: "15%",
          marginBottom: "10%",
        }}
      >
        All Done!
      </Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "10%",
          backgroundColor: "#4886ff",
          width: "25%",
          height: 40,
          borderRadius: 10,
        }}
        onPress={onNext}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Finished;
