import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { OobeStackParams } from "./navigator";
import Header from "../../src/components/header";
import pb from "../../src/pocketbase";
import { Collections } from "../../src/types";
import { useEffect, useState } from "react";
import { AuthMethodsList, ExternalAuthModel } from "pocketbase";

const Login: React.FC<NativeStackScreenProps<OobeStackParams, "Login">> = ({ navigation, route }) => {
  const [authMethods, setAuthMethods] = useState<AuthMethodsList>();

  useEffect(() => {
    (async () => {
      try {
        setAuthMethods(await pb.collection(Collections.Users).listAuthMethods());
        console.log(authMethods);
      } catch (err) {
        console.error(err.originalError);
      }
    })();
  }, []);

  return (
    <>
      <Header title="Setup" navigation={navigation} />
      <View style={{ marginHorizontal: 16, flexGrow: 1, alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: 500, flexGrow: 1 }}>
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome!</Text>
            <Text>Login to get started!</Text>
          </View>
          <View style={{ gap: 8, flexGrow: 2 }}>
            {authMethods?.emailPassword ? (
              <Button
                mode="contained"
                icon="email"
                onPress={() => {
                  navigation.navigate("LoginPassword");
                }}
              >
                Continue with Email & Password
              </Button>
            ) : authMethods?.usernamePassword ? (
              <Button
                mode="contained"
                icon="email"
                onPress={() => {
                  navigation.navigate("LoginPassword");
                }}
              >
                Continue with Username & Password
              </Button>
            ) : (
              <Button mode="contained" icon="email" disabled>
                Password Authentication Temprarily Disabled!
              </Button>
            )}
            {authMethods?.authProviders?.map?.((provider) => {
              return (
                <Button
                  mode="contained-tonal"
                  icon="google"
                  onPress={() => {
                    // pb.collection(Collections.Users).authWithOAuth2({});
                  }}
                >
                  Continue with Google (TODO)
                </Button>
              );
            }) ?? <></>}
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;
