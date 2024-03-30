import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { ActivityIndicator, MD3Colors, MD3DarkTheme, MD3LightTheme, PaperProvider, useTheme } from "react-native-paper";
import Router from "./app/router";
import { useContext, useEffect, useState } from "react";
import configContext, { ConfigContextProvider, defaultConfig } from "./src/contexts/config";
import storage from "./src/storage";
import { NavigationContainer } from "@react-navigation/native";
import { Config } from "./src/types";
import pb, { StoredAuth } from "./src/pocketbase";
import { EventSourcePolyfill } from "event-source-polyfill";

EventSourcePolyfill;

global.EventSource = EventSourcePolyfill;

const App: React.FC = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const [config, setConfig] = useState();
  const [loaded, setLoaded] = useState(false);

  //Init
  useEffect(() => {
    (async () => {
      try {
        const restoredAuthStore = await storage.load<StoredAuth>({ key: "auth" });
        pb.authStore.save(restoredAuthStore.token, restoredAuthStore.model);
        setLoaded(true);
      } catch {
        console.warn("Stored auth does not exist! Will open login page.");
        setLoaded(true);
      }
    })();
  }, []);

  const Main = loaded ? Router : Loading;

  return (
    <ConfigContextProvider>
      <PaperProvider theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </ConfigContextProvider>
  );
};

const Loading = () => {
  const theme = useTheme();

  return (
    <View
      style={{ backgroundColor: theme.colors.background, flexGrow: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={50} />
    </View>
  );
};

export default App;
