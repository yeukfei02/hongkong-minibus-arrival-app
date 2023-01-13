import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import "moment-timezone";
import { getRootUrl } from "../../helper/helper";

const rootUrl = getRootUrl();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "seashell",
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

  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        setRouteStopArrival(responseData.routeStopArrival[0].eta);
      }
    }
  };

  const renderRouteStopArrival = () => {
    let routeStopArrivalView = (
      <Card style={styles.cardContainer}>
        <Card.Content style={{ alignSelf: "center" }}>
          <Title>{t("pleaseWait")}</Title>
        </Card.Content>
      </Card>
    );

    if (!loading) {
      if (!_.isEmpty(routeStopArrival)) {
        routeStopArrivalView = routeStopArrival.map((item, i) => {
          return (
            <View key={i}>
              <Card style={styles.cardContainer}>
                <Card.Title
                  title={`${t("next")} ${item.eta_seq} ${t("bus")}`}
                />
                <Card.Content>
                  <Title>
                    {t("remainingTime")} {getMinutesDiffStr(item.timestamp)}
                  </Title>
                </Card.Content>
              </Card>
            </View>
          );
        });
      } else {
        routeStopArrivalView = (
          <Card style={styles.cardContainer}>
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ color: "red" }}>{t("noData")}</Title>
            </Card.Content>
          </Card>
        );
      }
    }

    return routeStopArrivalView;
  };

  const getMinutesDiffStr = (timestamp) => {
    let minutesDiffStr = t("noData");

    if (timestamp) {
      const now = moment().tz("Asia/Hong_Kong");
      const itemTime = moment(timestamp).tz("Asia/Hong_Kong");
      console.log("now = ", now);
      console.log("itemTime = ", itemTime);

      const minutesDiff = itemTime.diff(now, "minute");
      console.log("minutesDiff = ", minutesDiff);

      if (minutesDiff <= 1) {
        minutesDiffStr = `Arriving`;
      } else {
        minutesDiffStr = `${minutesDiff} minutes`;
      }
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
