import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoutesView from "../routesView/RoutesView";
import SettingsView from "../settingsView/SettingsView";

const Tab = createBottomTabNavigator();

function TabView() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon = null;

            if (route.name === "Routes") {
              if (focused) {
                icon = (
                  <MaterialCommunityIcons
                    name="routes"
                    size={size}
                    color={color}
                  />
                );
              } else {
                icon = (
                  <MaterialCommunityIcons
                    name="routes"
                    size={size}
                    color={color}
                  />
                );
              }
            } else if (route.name === "Settings") {
              if (focused) {
                icon = <Ionicons name="settings" size={size} color={color} />;
              } else {
                icon = (
                  <Ionicons name="settings-outline" size={size} color={color} />
                );
              }
            }

            return icon;
          },
          tabBarActiveTintColor: "limegreen",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Routes" component={RoutesView} />
        <Tab.Screen name="Settings" component={SettingsView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabView;
