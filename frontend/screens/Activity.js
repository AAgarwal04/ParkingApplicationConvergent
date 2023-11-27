import Active from "./Activity-Tabs/Active";
import History from "./Activity-Tabs/History";
import Upcoming from "./Activity-Tabs/Upcoming";

import { NavigationContainer } from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Listings = () => {
    const Tab = createMaterialTopTabNavigator();
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator initialRouteName="Active"
            tabBarOptions={{
                activeTintColor: "#4886ff",
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: '#EEEEF0', marginTop: insets.top }
            }}
        >
            <Tab.Screen name="Active" component={Active} options={{ tabBarLabel: "Active"}}/>
            <Tab.Screen name="Upcoming" component={Upcoming} options={{ tabBarLabel: "Upcoming"}}/>
            <Tab.Screen name="History" component={History} options={{ tabBarLabel: "History"}}/>
        </Tab.Navigator>
    );
}

export default Listings;