import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Snackbar, TextInput, useTheme } from "react-native-paper";
import { OobeStackParams } from "./navigator";
import Header from "../../src/components/header";
import pb from "../../src/pocketbase";
import { useContext, useState } from "react";
import { Collections } from "../../src/types";
import storage from "../../src/storage";
import configContext from "../../src/contexts/config";

const LoginPassword: React.FC<NativeStackScreenProps<OobeStackParams, "LoginPassword">> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | false>(false);
  const [success, setSuccess] = useState(false);
  const [config, setConfig] = useContext(configContext);
  const theme = useTheme();

  const handleLogin = async () => {
    setError(false);
    try {
      const res = await pb.collection(Collections.Users).authWithPassword(email, password);
      if (res.token) {
        setSuccess(true);
        const newConfig = Object.assign({}, config);
        newConfig.oobeComplete = true;
        setConfig(newConfig);
      } else {
        console.warn(res);
      }
    } catch (err) {
      console.error(err);
      setError(err.toString());
    }
  };

  return (
    <>
      <Header title="Login" navigation={navigation} />
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ScrollView
          bounces={false}
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 16,
          }}
        >
          <View style={{ width: "100%", maxWidth: 500 }}>
            <TextInput
              label="Email or Username"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
              }}
            />
            <TextInput
              label="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoComplete="password"
              passwordRules="minlength: 8;"
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
            />
            <View style={{ alignSelf: "flex-end", marginTop: 8 }}>
              <Button mode="contained" onPress={handleLogin}>
                Login
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
      <Snackbar
        style={{ backgroundColor: theme.colors.error }}
        visible={!!error}
        onDismiss={() => {
          setError(false);
        }}
      >
        {error}
      </Snackbar>
      <Snackbar
        visible={success}
        onDismiss={() => {
          setSuccess(false);
        }}
      >
        Successfully Logged In!
      </Snackbar>
    </>
  );
};

export default LoginPassword;
