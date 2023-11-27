import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Homepage from "./screens/Homepage";
import Settings from "./screens/Settings";
import Tut1 from "./screens/Tut1";
import Tut2 from "./screens/Tut2";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Park"
    labeled={true}
    barStyle={{
      backgroundColor: "#F9F9F9",
      borderTopWidth: 1,
      borderTopColor: "#D9D9D9",
      marginBottom: -10,
    }}
    activeColor="#4886FF"
  >
    <Tab.Screen
      name="Activity"
      component={Tut1} //Home Screen
      options={{
        tabBarLabel: "Activity",
        title: "Activity",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="clock-outline"
            size={30}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Park"
      component={Homepage}
      options={{
        tabBarLabel: "Park",
        title: "Park",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="car-side" size={34} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="List"
      component={Tut2}
      options={{
        tabBarLabel: "List",
        title: "List",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={30}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Settings}
      options={{
        tabBarLabel: "Profile",
        title: "Profile",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-outline"
            size={30}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
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
