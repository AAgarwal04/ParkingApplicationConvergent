import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Signin from "./screens/Signin";
import Homepage from "./screens/Homepage";
import Settings from "./screens/Settings";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          labeled={false}
          barStyle={{ backgroundColor: "black" }}
          activeColor="white"
        >
          <Tab.Screen
            name="Home"
            component={Homepage} //Home Screen
            options={{
              tabBarLabel: "Home",
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings} //Home Screen
            options={{
              tabBarLabel: "Settings",
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="Settings" color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

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
