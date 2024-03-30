import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { User, type Group, type Message as IMessage, Collections } from "../../src/types";
import { TouchableHighlight, TouchableOpacity, View, useWindowDimensions } from "react-native";
import pb from "../../src/pocketbase";
import { useEffect, useState } from "react";
import RenderHTML from "react-native-render-html";
import moment from "moment";
import Avatar from "../../src/components/avatar";
import MessageItemDialog from "./messageItemDialog";
import * as Haptics from "expo-haptics";

interface IProps {
  group: Group;
  message: IMessage;
}

const MessageListItem: React.FC<IProps> = ({ group, message }) => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();

  const openDialog = () => {
    setMessageDialogOpen(true);
    Haptics.selectionAsync();
  };

  return (
    <>
      <TouchableHighlight onLongPress={openDialog}>
        <Surface style={{ flexDirection: "row", padding: 8, gap: 8 }}>
          <Avatar
            record={message.expand.from}
            filename={message.expand.from.avatar}
            backupText={message.expand.from.name}
            avatarProps={{ size: 48 }}
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{message.expand.from.name}</Text>
              <Text> - {moment(message.created).fromNow()}</Text>
              {message.created !== message.updated ? (
                <Text style={{ fontStyle: "italic" }}> (edited {moment(message.updated).fromNow()})</Text>
              ) : (
                <></>
              )}
            </View>
            <Text style={{ width: windowDimensions.width - 96 }}>{message.text}</Text>
          </View>
        </Surface>
      </TouchableHighlight>
      <MessageItemDialog isOpen={messageDialogOpen} setIsOpen={setMessageDialogOpen} message={message} />
    </>
  );
};

export default MessageListItem;
