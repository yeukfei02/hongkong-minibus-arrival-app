import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Title, Text } from "react-native-paper";
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

function MinibusStopArrivalTime() {
  const route = useRoute();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [minibusStopArrivalTime, setMinibusStopArrivalTime] = useState([]);
  const [busRouteStrList, setBusRouteStrList] = useState([]);

  useEffect(() => {
    if (route.params) {
      const stopId = route.params.stopId;
      console.log("stopId = ", stopId);
      if (stopId) {
        getMinibusStopArrivalTime(stopId);
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (minibusStopArrivalTime) {
      getBusRouteStrListRequest(minibusStopArrivalTime);
    }
  }, [minibusStopArrivalTime]);

  const getBusRouteStrListRequest = async (minibusStopArrivalTime) => {
    const busRouteStrList = [];

    for (let index = 0; index < minibusStopArrivalTime.length; index++) {
      const minibusStopArrivalTimeObj = minibusStopArrivalTime[index];
      console.log(
        "minibusStopArrivalTimeObj.route_id = ",
        minibusStopArrivalTimeObj.route_id
      );

      const busRouteStr = await getBusRouteStr(
        minibusStopArrivalTimeObj.route_id.toString()
      );
      busRouteStrList.push(busRouteStr);
    }

    setBusRouteStrList(busRouteStrList);
  };

  const getMinibusStopArrivalTime = async (stopId) => {
    const response = await axios.get(`${rootUrl}/bus-stop-arrival`, {
      params: {
        stopId: stopId,
      },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        setLoading(false);
        const filteredMinibusStopArrivalTime =
          responseData.busStopArrival.filter((item) => {
            return !_.isEmpty(item.eta);
          });
        setMinibusStopArrivalTime(filteredMinibusStopArrivalTime);
      }
    }
  };

  const renderMinibusStopArrivalTime = () => {
    let minibusStopArrivalTimeView = (
      <Card style={styles.cardContainer}>
        <Card.Content style={{ alignSelf: "center" }}>
          <Title>{t("pleaseWait")}</Title>
        </Card.Content>
      </Card>
    );

    if (!loading) {
      if (!_.isEmpty(minibusStopArrivalTime)) {
        if (!_.isEmpty(busRouteStrList)) {
          const etaList = [];

          for (let index = 0; index < minibusStopArrivalTime.length; index++) {
            const minibusStopArrivalTimeObj = minibusStopArrivalTime[index];

            const etaCardViewList = minibusStopArrivalTimeObj.eta.map(
              (item, i) => {
                const view = (
                  <View key={i}>
                    <Card style={styles.cardContainer}>
                      <Card.Title
                        title={`${t("next")} ${item.eta_seq} ${t("bus")}`}
                      />
                      <Card.Content>
                        <Title>
                          {t("remainingTime")}{" "}
                          {getMinutesDiffStr(item.timestamp)}
                        </Title>
                      </Card.Content>
                    </Card>
                  </View>
                );
                return view;
              }
            );

            const view = (
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "black",
                    marginHorizontal: 25,
                    marginVertical: 10,
                  }}
                >
                  {busRouteStrList[index]}
                </Text>
                {etaCardViewList}
              </View>
            );
            etaList.push(view);
          }

          minibusStopArrivalTimeView = etaList;
        }
      } else {
        minibusStopArrivalTimeView = (
          <Card style={styles.cardContainer}>
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={{ color: "red" }}>{t("noData")}</Title>
            </Card.Content>
          </Card>
        );
      }
    }

    return minibusStopArrivalTimeView;
  };

  const getBusRouteStr = async (routeId) => {
    let busRouteStr = "";

    const response = await axios.get(`${rootUrl}/bus-route/${routeId}`);
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        busRouteStr = responseData.busRoute.route_code;
      }
    }

    return busRouteStr;
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
        minutesDiffStr = `${t("arriving")}`;
      } else {
        minutesDiffStr = `${minutesDiff} ${t("minutes")}`;
      }
    }

    return minutesDiffStr;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderMinibusStopArrivalTime()}
    </ScrollView>
  );
}

export default MinibusStopArrivalTime;
