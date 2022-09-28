import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import TabView from "./src/components/tabView/TabView";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "limegreen",
    secondary: "red",
    tertiary: "gray",
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <TabView />
    </PaperProvider>
  );
}

export default App;
