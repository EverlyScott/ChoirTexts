import { AuthProviderInfo } from "pocketbase";
import { Button } from "react-native-paper";
import { Collections } from "../../src/types";
import * as WebBrowser from "expo-web-browser";
import pb from "../../src/pocketbase";

interface IProps {
  provider: AuthProviderInfo;
}

const OAuthProvider: React.FC<IProps> = ({ provider }) => {
  const handlePress = async () => {
    await pb
      .collection(Collections.Users)
      .authWithOAuth2({
        provider: provider.name,
        urlCallback: async (url) => {
          await WebBrowser.openAuthSessionAsync(url);
          console.log(url);
        },
      })
      .catch((err) => {
        console.log(err, err.originalError);
      });
  };

  return (
    <Button mode="contained-tonal" icon="google" onPress={handlePress}>
      Continue with {provider.displayName}
    </Button>
  );
};

export default OAuthProvider;
