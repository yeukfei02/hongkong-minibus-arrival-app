import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import NearbyMinibusStop from "../nearbyMinibusStop/NearbyMinibusStop";
import MinibusStopArrivalTime from "../minibusStopArrivalTime/MinibusStopArrivalTime";

const Stack = createNativeStackNavigator();

function NearMeView() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t("nearbyMinibusStop")}
        component={NearbyMinibusStop}
      />
      <Stack.Screen
        name={t("minibusStopArrivalTime")}
        component={MinibusStopArrivalTime}
      />
    </Stack.Navigator>
  );
}

export default NearMeView;
