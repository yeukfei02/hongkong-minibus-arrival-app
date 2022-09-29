import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
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
});

function BusRoute() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, i18n } = useTranslation();

  const [busRoutes, setBusRoutes] = useState([]);

  useEffect(() => {
    if (route.params) {
      const region = route.params.region;
      const routeStr = route.params.routeStr;
      if (region && routeStr) {
        getBusRoute(region, routeStr);
      }
    }
  }, [route.params]);

  const getBusRoute = async (region, routeStr) => {
    const response = await axios.get(`${rootUrl}/bus-route`, {
      params: {
        region: region,
        routeStr: routeStr,
      },
    });
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        setBusRoutes(responseData.busRoute);
      }
    }
  };

  const getDescriptionText = (item) => {
    let descriptionText = "";

    if (i18n.language) {
      switch (i18n.language) {
        case "eng":
          descriptionText = item.description_en;
          break;
        case "zh_hk":
          descriptionText = item.description_tc;
          break;
        case "zh_cn":
          descriptionText = item.description_sc;
          break;
        default:
          break;
      }
    }

    return descriptionText;
  };

  const getDirectionText = (item) => {
    let directionText = "";

    if (i18n.language) {
      switch (i18n.language) {
        case "eng":
          directionText = `From ${item.directions[0].orig_en} to ${item.directions[0].dest_en}`;
          break;
        case "zh_hk":
          directionText = `From ${item.directions[0].orig_tc} to ${item.directions[0].dest_tc}`;
          break;
        case "zh_cn":
          directionText = `From ${item.directions[0].orig_sc} to ${item.directions[0].dest_sc}`;
          break;
        default:
          break;
      }
    }

    return directionText;
  };

  const renderBusRoute = () => {
    let busRouteView = null;

    if (busRoutes) {
      busRouteView = busRoutes.map((item, i) => {
        return (
          <Card key={i} style={styles.cardContainer}>
            <Card.Title
              title={item.route_code}
              subtitle={getRegionText(item.region)}
            />
            <Card.Content>
              <Title>{getDescriptionText(item)}</Title>
              <Paragraph>{getDirectionText(item)}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                onPress={() => handleEnterButtonClick(item.route_id)}
              >
                Enter
              </Button>
            </Card.Actions>
          </Card>
        );
      });
    }

    return busRouteView;
  };

  const getRegionText = (region) => {
    let regionText = "";

    if (region) {
      switch (region) {
        case "HKI":
          regionText = t("hongkongIsland");
          break;
        case "KLN":
          regionText = t("kowloon");
          break;
        case "NT":
          regionText = t("newTerritories");
          break;
        default:
          break;
      }
    }

    return regionText;
  };

  const handleEnterButtonClick = (routeId) => {
    navigation.navigate(t("routeStop"), { routeId: routeId });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderBusRoute()}
    </ScrollView>
  );
}

export default BusRoute;
