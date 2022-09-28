import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
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

  const renderBusRoute = () => {
    let busRouteView = null;

    if (busRoutes) {
      busRouteView = busRoutes.map((item, i) => {
        return (
          <Card key={i} style={styles.cardContainer}>
            <Card.Title title={item.route_code} subtitle={item.region} />
            <Card.Content>
              <Title>{item.description_en}</Title>
              <Paragraph>
                From {item.directions[0].orig_en} to{" "}
                {item.directions[0].dest_en}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleEnterButtonClick(item.route_id)}>
                Enter
              </Button>
            </Card.Actions>
          </Card>
        );
      });
    }

    return busRouteView;
  };

  const handleEnterButtonClick = (routeId) => {
    navigation.navigate("RouteStop", { routeId: routeId });
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
