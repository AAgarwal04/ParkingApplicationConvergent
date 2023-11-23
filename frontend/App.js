import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Homepage from "./screens/Homepage";
import Settings from "./screens/Settings";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
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
);

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa",
    alignItems: "center",
    justifyContent: "center",
  },
});
