import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { MD3Colors, MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import Router from "./app/router";
import { useContext, useEffect, useState } from "react";
import configContext, { defaultConfig } from "./src/contexts/config";
import storage from "./src/storage";
import { NavigationContainer } from "@react-navigation/native";
import { Config } from "./src/types";

const App: React.FC = () => {
  const [config, setConfig] = useState(defaultConfig);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async () => {
      const newConfig = await storage.load({ key: "config" });
      if (newConfig) {
        setConfig(newConfig);
      }
    };
  }, []);

  const handleUpdateConfig = (newConfig: Config) => {
    storage.save({ key: "config", data: newConfig, expires: null });
    setConfig(newConfig);
  };

  //TODO: fix scheme detection
  return (
    <PaperProvider theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer>
        <configContext.Provider value={[config, handleUpdateConfig]}>
          <Router />
        </configContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
