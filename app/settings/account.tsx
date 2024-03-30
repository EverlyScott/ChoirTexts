import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainNavigatorParams } from "../router";
import createNavigationContext from "../../src/contexts/navigation";
import Header from "../../src/components/header";

export const accountSettingsContext = createNavigationContext<MainNavigatorParams, "AccountSettings">();

const AccountSettings: React.FC<NativeStackScreenProps<MainNavigatorParams, "AccountSettings">> = ({
  navigation,
  route,
}) => {
  return (
    <accountSettingsContext.Provider value={{ navigation, route }}>
      <Header title="Account Settings" navigation={navigation} />
    </accountSettingsContext.Provider>
  );
};

export default AccountSettings;
