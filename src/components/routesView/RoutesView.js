import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../routes/Routes";
import BusRoute from "../busRoute/BusRoute";
import RouteStop from "../routeStop/RouteStop";

const Stack = createNativeStackNavigator();

function RoutesView() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Routes" component={Routes} />
      <Stack.Screen name="BusRoute" component={BusRoute} />
      <Stack.Screen name="RouteStop" component={RouteStop} />
    </Stack.Navigator>
  );
}

export default RoutesView;
