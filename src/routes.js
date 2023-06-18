import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NewNews from "./pages/NewNews";
import CustomTabBar from "./components/CustomTabBar";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#121212",

        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#FFF",
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
	{/* Removido temporariamente */}
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: "account",
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: "newspaper",
        }}
      />
      <Tab.Screen
        name="NewNews"
        component={NewNews}
        options={{
          tabBarIcon: "plus-circle-outline",
        }}
      />
    </Tab.Navigator>
  );
}
