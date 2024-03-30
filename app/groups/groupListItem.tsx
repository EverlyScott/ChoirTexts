import { TouchableOpacity, View } from "react-native";
import { Group } from "../../src/types";
import { useContext } from "react";
import { mainNavContext } from "../mainNavigator";
import { Surface, Text } from "react-native-paper";
import pb from "../../src/pocketbase";
import Avatar from "../../src/components/avatar";
import GroupListItemLatestMessage from "./groupListItemLatestMessage";

interface IProps {
  group: Group;
}

const GroupListItem: React.FC<IProps> = ({ group }) => {
  const { navigation } = useContext(mainNavContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Group", { group });
      }}
    >
      <Surface style={{ padding: 16, marginHorizontal: 16, borderRadius: 4, flexDirection: "row", gap: 16 }}>
        <Avatar record={group} filename={group.icon} backupText={group.name} backupIcon="account-group" />
        <View style={{ gap: 4, justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{group.name}</Text>
          <GroupListItemLatestMessage group={group} />
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default GroupListItem;
