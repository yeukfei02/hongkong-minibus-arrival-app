import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Platform, Linking } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { getRootUrl } from "../../helper/helper";

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
  arrowDownIcon: {
    alignSelf: "center",
  },
  openInMap: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

function RouteStop() {
  const route = useRoute();
  const { i18n } = useTranslation();

  const [routeStop, setRouteStop] = useState([]);

  useEffect(() => {
    if (route.params) {
      const routeId = route.params.routeId;
      if (routeId) {
        getRouteStop(routeId);
      }
    }
  }, [route.params]);

  const getRouteStop = async (routeId) => {
    const response = await axios.get(`${rootUrl}/route-stop`, {
      params: {
        routeId: routeId,
      },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        setRouteStop(responseData.routeStop);
      }
    }
  };

  const getNameText = (item) => {
    let nameText = "";

    if (i18n.language) {
      switch (i18n.language) {
        case "eng":
          nameText = item.name_en;
          break;
        case "zh_hk":
          nameText = item.name_tc;
          break;
        case "zh_cn":
          nameText = item.name_sc;
          break;
        default:
          break;
      }
    }

    return nameText;
  };

  const renderRouteStop = () => {
    let routeStopView = null;

    if (routeStop) {
      routeStopView = routeStop.map((item, i) => {
        return (
          <View key={i}>
            <Card style={styles.cardContainer}>
              <Card.Content>
                <Title>{getNameText(item)}</Title>
                <Paragraph
                  style={styles.openInMap}
                  onPress={() => handleOpenInMap(item.stop_id)}
                >
                  Open in map
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="outlined">Enter</Button>
              </Card.Actions>
            </Card>
            {renderArrowDownIcon(i)}
          </View>
        );
      });
    }

    return routeStopView;
  };

  const renderArrowDownIcon = (i) => {
    let arrowDownIcon = null;

    if (i !== routeStop.length - 1) {
      arrowDownIcon = (
        <Ionicons name="arrow-down" size={30} style={styles.arrowDownIcon} />
      );
    }

    return arrowDownIcon;
  };

  const handleOpenInMap = async (stopId) => {
    const response = await axios.get(`${rootUrl}/bus-stop`, {
      params: { stopId: stopId },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        const latitude = responseData.busStop.coordinates.wgs84.latitude;
        const longitude = responseData.busStop.coordinates.wgs84.longitude;
        if (latitude !== 0 && longitude !== 0) {
          openMap(latitude, longitude);
        }
      }
    }
  };

  const openMap = (latitude, longitude) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = "Bus Stop";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderRouteStop()}
    </ScrollView>
  );
}

export default RouteStop;
