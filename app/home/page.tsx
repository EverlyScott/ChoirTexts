import { Text } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import Header from "../../src/components/header";
import GroupList from "../groups/groupList";
import { useContext } from "react";
import { mainNavContext } from "../mainNavigator";

const Home: React.FC = () => {
  const { navigation } = useContext(mainNavContext);

  return (
    <>
      <Header title="Home" navigation={navigation} />
    </>
  );
};

export default Home;
