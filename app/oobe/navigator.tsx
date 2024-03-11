import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import LoginPassword from "./loginPassword";

export type OobeStackParams = {
  Login: undefined;
  LoginPassword: undefined;
};

const Stack = createNativeStackNavigator<OobeStackParams>();

const OobeNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginPassword" component={LoginPassword} />
    </Stack.Navigator>
  );
};

export default OobeNavigator;
