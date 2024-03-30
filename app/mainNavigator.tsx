import { useContext, useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import OobeNavigator from "./oobe/navigator";
import configContext from "../src/contexts/config";

//Import Pages
import Home from "./home/page";
import Debug from "./debug/page";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainNavigatorParams } from "./router";
import createNavigationContext from "../src/contexts/navigation";
import Groups from "./groups/page";
import Settings from "./settings/page";

export const mainNavContext = createNavigationContext<MainNavigatorParams, "Main">();

const MainNav: React.FC<NativeStackScreenProps<MainNavigatorParams, "Main">> = ({ navigation, route }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState<BaseRoute[]>([
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "groups", title: "Groups", focusedIcon: "account-group", unfocusedIcon: "account-group-outline" },
    { key: "settings", title: "Settings", focusedIcon: "cog", unfocusedIcon: "cog-outline" },
    { key: "debug", title: "debug", focusedIcon: "bug", unfocusedIcon: "bug-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    groups: Groups,
    settings: Settings,
    debug: Debug,
  });

  return (
    <mainNavContext.Provider value={{ navigation, route }}>
      <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />
    </mainNavContext.Provider>
  );
};

export default MainNav;
