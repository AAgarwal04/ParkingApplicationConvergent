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
import Activity from "./screens/Activity";
import List from "./screens/List";
import Profile from "./screens/Profile";
import Spot from "./screens/Spot";
import Finished from "./screens/Finished";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = ({ navigation }) => (
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
      component={Activity}
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
          <MaterialCommunityIcons name="car-outline" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="List"
      component={List}
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
      component={Profile}
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
        <Stack.Screen name="Spot" component={Spot} options={detachPreviousScreen=false} />
        <Stack.Screen name="Finished" component={Finished} />
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
