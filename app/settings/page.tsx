import { useContext } from "react";
import Header from "../../src/components/header";
import { mainNavContext } from "../mainNavigator";
import { Surface, Text } from "react-native-paper";
import pb from "../../src/pocketbase";
import { User } from "../../src/types";
import Avatar from "../../src/components/avatar";

const Settings: React.FC = () => {
  const { navigation } = useContext(mainNavContext);

  return (
    <>
      <Header title="Settings" navigation={navigation} />
      <Surface style={{ flexDirection: "row" }}>
        <Avatar record={pb.authStore.model} filename={pb.authStore.model.avatar} backupText={pb.authStore.model.name} />
        <Text>{pb.authStore.model.name}</Text>
      </Surface>
    </>
  );
};

export default Settings;
