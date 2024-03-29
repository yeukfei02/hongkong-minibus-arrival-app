import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import NearMeView from "../nearMeView/NearMeView";
import RoutesView from "../routesView/RoutesView";
import SettingsView from "../settingsView/SettingsView";

const Tab = createBottomTabNavigator();

function TabView() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon = null;

            switch (route.name) {
              case "Near Me":
              case "靠近我":
                if (focused) {
                  icon = (
                    <MaterialCommunityIcons
                      name="near-me"
                      size={size}
                      color={color}
                    />
                  );
                } else {
                  icon = (
                    <MaterialCommunityIcons
                      name="near-me"
                      size={size}
                      color={color}
                    />
                  );
                }
                break;
              case "Routes":
              case "路線":
              case "路线":
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
                break;
              case "Settings":
              case "設定":
              case "设定":
                if (focused) {
                  icon = <Ionicons name="settings" size={size} color={color} />;
                } else {
                  icon = (
                    <Ionicons
                      name="settings-outline"
                      size={size}
                      color={color}
                    />
                  );
                }
                break;
              default:
                break;
            }

            return icon;
          },
          tabBarActiveTintColor: "limegreen",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name={t("nearMe")} component={NearMeView} />
        <Tab.Screen name={t("routes")} component={RoutesView} />
        <Tab.Screen name={t("settings")} component={SettingsView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabView;
