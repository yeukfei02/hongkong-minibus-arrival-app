import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import Routes from "../routes/Routes";
import BusRoute from "../busRoute/BusRoute";
import RouteStop from "../routeStop/RouteStop";
import RouteStopArrival from "../routeStopArrival/RouteStopArrival";

const Stack = createNativeStackNavigator();

function RoutesView() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name={t("routes")} component={Routes} />
      <Stack.Screen name={t("busRoute")} component={BusRoute} />
      <Stack.Screen name={t("routeStop")} component={RouteStop} />
      <Stack.Screen name={t("routeStopArrival")} component={RouteStopArrival} />
    </Stack.Navigator>
  );
}

export default RoutesView;
