import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Spot = ({ navigation }) => {
  const handleBack = () => {
    navigation.replace("Main");
  };

  const onNext = () => {
    navigation.replace("Finished");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: "10%",
          height: 40,
          borderRadius: 10,
          marginTop: "10%",
          marginRight: "85%",
        }}
        onPress={handleBack}
      >
        <Ionicons name="arrow-back" size={24} color="#4886ff" />
      </TouchableOpacity>
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/book_spot_example.png")}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "10%",
          backgroundColor: "#4886ff",
          width: "85%",
          height: 40,
          borderRadius: 10,
        }}
        onPress={onNext}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFC",
    height: "100%",
  },
});

export default Spot;
