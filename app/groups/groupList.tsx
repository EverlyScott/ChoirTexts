import { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { Collections, Group } from "../../src/types";
import { Surface, Text } from "react-native-paper";
import pb from "../../src/pocketbase";
import { mainNavContext } from "../mainNavigator";
import GroupListItem from "./groupListItem";
import Loading from "./loading";

interface IProps {}

const GroupList: React.FC<IProps> = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadGroups = async () => {
    try {
      setLoaded(false);
      console.log(pb.authStore.token);
      const newGroups = await pb.collection(Collections.Groups).getFullList<Group>();
      setGroups(newGroups);
      setLoaded(true);
    } catch (err) {
      setLoaded(true);
      console.error(err);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <ScrollView
      style={{ paddingVertical: 16, flexGrow: 1 }}
      contentContainerStyle={{ flexGrow: 1, gap: 16 }}
      refreshControl={<RefreshControl refreshing={!loaded} onRefresh={loadGroups} />}
    >
      {loaded ? (
        <>
          {groups.map((group) => {
            return <GroupListItem group={group} key={group.id} />;
          })}
        </>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default GroupList;
