import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getRootUrl } from "../../helper/helper";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Hong_Kong");

const rootUrl = getRootUrl();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  cardContainer: {
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 5,
  },
});

function RouteStopArrival() {
  const route = useRoute();
  const { t } = useTranslation();

  const [routeStopArrival, setRouteStopArrival] = useState([]);

  useEffect(() => {
    if (route.params) {
      const routeId = route.params.routeId;
      const stopId = route.params.stopId;
      if (routeId && stopId) {
        getRouteStopArrival(routeId, stopId);
      }
    }
  }, [route.params]);

  const getRouteStopArrival = async (routeId, stopId) => {
    const response = await axios.get(`${rootUrl}/route-stop-arrival`, {
      params: {
        routeId: routeId,
        stopId: stopId,
      },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        setRouteStopArrival(responseData.routeStopArrival[0].eta);
      }
    }
  };

  const renderRouteStopArrival = () => {
    let routeStopArrivalView = null;

    if (routeStopArrival) {
      routeStopArrivalView = routeStopArrival.map((item, i) => {
        return (
          <View key={i}>
            <Card style={styles.cardContainer}>
              <Card.Title title={`Next ${item.eta_seq} bus`} />
              <Card.Content>
                <Title>
                  {t("remainingTime")} {getMinutesDiffStr(item.timestamp)}
                </Title>
              </Card.Content>
            </Card>
          </View>
        );
      });
    }

    return routeStopArrivalView;
  };

  const getMinutesDiffStr = (timestamp) => {
    let minutesDiffStr = "";

    const now = dayjs().tz("Asia/Hong_Kong");
    const itemTime = dayjs(timestamp).tz("Asia/Hong_Kong");

    console.log("now = ", now);
    console.log("itemTime = ", itemTime);

    const minutesDiff = itemTime.diff(now, "minute");

    console.log("minutesDiff = ", minutesDiff);

    if (minutesDiff > 0) {
      minutesDiffStr = `${minutesDiff} minutes`;
    } else {
      minutesDiffStr = `Arriving`;
    }

    return minutesDiffStr;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderRouteStopArrival()}
    </ScrollView>
  );
}

export default RouteStopArrival;
