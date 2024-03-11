import { useContext, useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import storage from "../src/storage";

//Import Pages
import Home from "./home/page";
import Debug from "./debug/page";
import Login from "./oobe/login";
import OobeNavigator from "./oobe/navigator";
import configContext from "../src/contexts/config";

const Router: React.FC = () => {
  const [config] = useContext(configContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState<BaseRoute[]>([
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "debug", title: "debug" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    debug: Debug,
  });

  if (config.oobeComplete) {
    return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
  } else {
    return <OobeNavigator />;
  }
};

export default Router;
