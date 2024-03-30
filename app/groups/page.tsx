import { useContext } from "react";
import Header from "../../src/components/header";
import { mainNavContext } from "../mainNavigator";
import GroupList from "./groupList";

const Groups: React.FC = () => {
  const { navigation } = useContext(mainNavContext);

  return (
    <>
      <Header title="Groups" navigation={navigation} />
      <GroupList />
    </>
  );
};

export default Groups;
