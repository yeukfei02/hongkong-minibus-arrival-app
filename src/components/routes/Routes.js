import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { List, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
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
  textInputContainer: {
    marginHorizontal: 25,
    marginVertical: 5,
  },
  accordionContainer: {
    marginHorizontal: 25,
    marginVertical: 3,
  },
});

function Routes() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [allHKIRoutes, setAllHKIRoutes] = useState([]);
  const [allKLNRoutes, setAllKLNRoutes] = useState([]);
  const [allNTRoutes, setAllNTRoutes] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllRoutes();
  }, []);

  const getAllRoutes = async () => {
    const response = await axios.get(`${rootUrl}/route`);
    if (response && response.status === 200) {
      const responseData = response.data;
      console.log("responseData = ", responseData);

      if (responseData) {
        setAllHKIRoutes(responseData.allRoute.routes.HKI);
        setAllKLNRoutes(responseData.allRoute.routes.KLN);
        setAllNTRoutes(responseData.allRoute.routes.NT);
      }
    }
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const renderAllHKIRoutes = (allHKIRoutes) => {
    let allHKIRoutesView = null;

    if (allHKIRoutes) {
      let allHKIRoutesList = allHKIRoutes;

      if (searchText) {
        allHKIRoutesList = allHKIRoutes.filter((item) => {
          return item.toUpperCase().includes(searchText.toUpperCase());
        });
      }

      const allHKIRoutesItemList = allHKIRoutesList.map((item, i) => {
        return (
          <List.Item
            key={i}
            title={item}
            onPress={() => handleListItemClick("HKI", item)}
            left={(props) => <List.Icon {...props} icon="bus" />}
          />
        );
      });

      allHKIRoutesView = (
        <List.Section>
          <List.Accordion
            title={t("hongkongIsland")}
            left={(props) => <List.Icon {...props} icon="bus" />}
          >
            {allHKIRoutesItemList}
          </List.Accordion>
        </List.Section>
      );
    }

    return allHKIRoutesView;
  };

  const renderAlKLNRoutes = (allKLNRoutes) => {
    let allKLNRoutesView = null;

    if (allKLNRoutes) {
      let allKLNRoutesList = allKLNRoutes;

      if (searchText) {
        allKLNRoutesList = allKLNRoutes.filter((item) => {
          return item.toUpperCase().includes(searchText.toUpperCase());
        });
      }

      const allKLNRoutesItemList = allKLNRoutesList.map((item, i) => {
        return (
          <List.Item
            key={i}
            title={item}
            onPress={() => handleListItemClick("KLN", item)}
            left={(props) => <List.Icon {...props} icon="bus" />}
          />
        );
      });

      allKLNRoutesView = (
        <List.Section>
          <List.Accordion
            title={t("kowloon")}
            left={(props) => <List.Icon {...props} icon="bus" />}
          >
            {allKLNRoutesItemList}
          </List.Accordion>
        </List.Section>
      );
    }

    return allKLNRoutesView;
  };

  const renderAllNTRoutes = (allNTRoutes) => {
    let allNTRoutesView = null;

    if (allNTRoutes) {
      let allNTRoutesList = allNTRoutes;

      if (searchText) {
        allNTRoutesList = allNTRoutes.filter((item) => {
          return item.toUpperCase().includes(searchText.toUpperCase());
        });
      }

      const allNTRoutesItemList = allNTRoutesList.map((item, i) => {
        return (
          <List.Item
            key={i}
            title={item}
            onPress={() => handleListItemClick("NT", item)}
            left={(props) => <List.Icon {...props} icon="bus" />}
          />
        );
      });

      allNTRoutesView = (
        <List.Section>
          <List.Accordion
            title={t("newTerritories")}
            left={(props) => <List.Icon {...props} icon="bus" />}
          >
            {allNTRoutesItemList}
          </List.Accordion>
        </List.Section>
      );
    }

    return allNTRoutesView;
  };

  const handleListItemClick = (region, routeStr) => {
    navigation.navigate(t("busRoute"), { region: region, routeStr: routeStr });
  };

  const renderRoutesView = () => {
    let routesView = null;

    if (allHKIRoutes || allKLNRoutes || allNTRoutes) {
      routesView = (
        <View>
          <View style={styles.textInputContainer}>
            <TextInput
              label={t("searchRoutes")}
              placeholder={t("searchRoutes")}
              value={searchText}
              onChangeText={(text) => handleSearchTextChange(text)}
            />
          </View>

          <View style={styles.accordionContainer}>
            {renderAllHKIRoutes(allHKIRoutes)}
          </View>

          <View style={styles.accordionContainer}>
            {renderAlKLNRoutes(allKLNRoutes)}
          </View>

          <View style={styles.accordionContainer}>
            {renderAllNTRoutes(allNTRoutes)}
          </View>
        </View>
      );
    }

    return routesView;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {renderRoutesView()}
    </ScrollView>
  );
}

export default Routes;
