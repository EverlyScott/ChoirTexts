import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Group } from "../src/types";
import MainNav from "./mainNavigator";
import GroupComponent from "./group/page";
import AccountSettings from "./settings/account";
import { useContext } from "react";
import configContext from "../src/contexts/config";
import OobeNavigator from "./oobe/navigator";
import pb from "../src/pocketbase";
import { useTheme } from "react-native-paper";

export type MainNavigatorParams = {
  Main: undefined;
  Group: { group: Group };
  AccountSettings: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParams>();

const Router: React.FC = () => {
  const [config] = useContext(configContext);
  const theme = useTheme();

  console.log(JSON.stringify(theme.colors));

  if (config.oobeComplete) {
    if (pb.authStore.model === null) {
      return <OobeNavigator showResetSnackbar />;
    }

    return (
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainNav} />
        <Stack.Screen name="Group" component={GroupComponent} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
      </Stack.Navigator>
    );
  }

  return <OobeNavigator />;
};

export default Router;
