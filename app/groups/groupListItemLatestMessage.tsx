import { Text, useTheme } from "react-native-paper";
import { Collections, Group, Message } from "../../src/types";
import { useEffect, useState } from "react";
import pb from "../../src/pocketbase";
import { useWindowDimensions } from "react-native";

interface IProps {
  group: Group;
}

const GroupListItemLatestMessage: React.FC<IProps> = ({ group }) => {
  const windowDimensions = useWindowDimensions();
  const theme = useTheme();
  const [latestMessage, setLatestMessage] = useState<Message>();
  const [notFound, setNotFound] = useState(false);

  const loadLatestMessage = async () => {
    try {
      console.log(`id="${group.id}"`);
      const newLatestMessage = await pb
        .collection(Collections.Messages)
        .getFirstListItem<Message>(`group="${group.id}"`, { sort: "-created", expand: "from" });

      setLatestMessage(newLatestMessage);
    } catch (err) {
      if (err.status === 404) {
        setNotFound(true);
      } else {
        console.error(err.originalError);
      }
    }
  };

  useEffect(() => {
    loadLatestMessage();

    pb.collection(Collections.Messages)
      .subscribe<Message>("*", (data) => {
        if (data.record.group === group.id) {
          loadLatestMessage();
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      pb.collection(Collections.Messages).unsubscribe("*");
    };
  }, []);

  if (notFound) {
    return <></>;
  } else {
    if (latestMessage) {
      return (
        <Text numberOfLines={2} style={{ width: windowDimensions.width - 144, color: theme.colors.secondary }}>
          {latestMessage.expand.from.name}: {latestMessage.text}
        </Text>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
};

export default GroupListItemLatestMessage;
