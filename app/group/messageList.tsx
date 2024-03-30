import { useEffect, useState } from "react";
import { Collections, Group, Message } from "../../src/types";
import { Text } from "react-native-paper";
import pb from "../../src/pocketbase";
import MessageListItem from "./messageListItem";

interface IProps {
  group: Group;
}

const MessageList: React.FC<IProps> = ({ group }) => {
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const newMessages = await pb
      .collection(Collections.Messages)
      .getFullList<Message>({ sort: "+created", filter: `group="${group.id}"`, expand: "from" });
    setMessages(newMessages);
  };

  useEffect(() => {
    (async () => {
      setLoaded(false);
      await loadMessages();
      setLoaded(true);
    })();

    pb.collection(Collections.Messages)
      .subscribe<Message>("*", (data) => {
        if (data.record.group === group.id) {
          loadMessages();
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      pb.collection(Collections.Messages).unsubscribe("*");
    };
  }, []);

  if (loaded) {
    return (
      <>
        <Text style={{ fontSize: 32, textAlign: "center", fontWeight: "500" }}>
          {messages.length > 0 ? "You've reached the begining of this group" : `Welcome to ${group.name}!`}
        </Text>
        {messages.map((message) => {
          return <MessageListItem group={group} message={message} key={message.id} />;
        })}
      </>
    );
  } else {
    return <></>;
  }
};

export default MessageList;
