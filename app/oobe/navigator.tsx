import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import LoginPassword from "./loginPassword";
import { Snackbar } from "react-native-paper";
import { useState } from "react";

interface IProps {
  showResetSnackbar?: boolean;
}

export type OobeStackParams = {
  Login: undefined;
  LoginPassword: undefined;
};

const Stack = createNativeStackNavigator<OobeStackParams>();

const OobeNavigator: React.FC<IProps> = ({ showResetSnackbar }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(showResetSnackbar);

  return (
    <>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
      </Stack.Navigator>
      <Snackbar
        visible={snackbarOpen}
        onDismiss={() => {
          setSnackbarOpen(false);
        }}
      >
        You have been logged out
      </Snackbar>
    </>
  );
};

export default OobeNavigator;
