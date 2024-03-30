import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainNavigatorParams } from "../router";
import Header from "../../src/components/header";
import {
  ScrollView,
  TextInput as RNTextInput,
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Surface, Text, TextInput, useTheme } from "react-native-paper";
import MessageListItem from "./messageListItem";
import pb from "../../src/pocketbase";
import { useRef, useState } from "react";
import { Collections, Message as IMessage } from "../../src/types";
import MessageList from "./messageList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Group: React.FC<NativeStackScreenProps<MainNavigatorParams, "Group">> = ({ navigation, route }) => {
  const { group } = route.params;
  const [message, setMessage] = useState("");
  const textInputRef = useRef<RNTextInput>();
  const theme = useTheme();
  const safeInsets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

  const handleMessageChange = (newVal: string) => {
    setMessage(newVal);
  };

  const handleSendMessage = async () => {
    textInputRef.current.blur();
    await pb
      .collection(Collections.Messages)
      .create({ group: group.id, from: pb.authStore.model.id, text: message.trim() });
    setMessage("");
  };

  console.log(safeInsets);

  return (
    <>
      <Header title={group.name} navigation={navigation} />
      <KeyboardAvoidingView
        style={{ backgroundColor: theme.colors.background }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={safeInsets.bottom * -1}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: windowDimensions.height - safeInsets.top - 64 - safeInsets.bottom - 52,
          }}
          keyboardDismissMode="interactive"
          style={{
            transform: [{ scaleY: -1 }],
            width: "100%",
            paddingTop: 16,
            flexGrow: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <View style={{ transform: [{ scaleY: -1 }], gap: 16, width: "100%" }}>
            <MessageList group={group} />
          </View>
        </ScrollView>
        <Surface style={{ paddingBottom: safeInsets.bottom }}>
          {group.owner === pb.authStore.model.id ?? group.allowedPosters.includes(pb.authStore.model.id) ? (
            <TextInput
              enablesReturnKeyAutomatically
              multiline
              dense
              ref={textInputRef}
              label={`Send a message to ${group.name}`}
              value={message}
              onChangeText={handleMessageChange}
              right={
                <TextInput.Icon
                  disabled={message.trim().length <= 0}
                  color={theme.colors.primary}
                  icon="send"
                  onPress={handleSendMessage}
                />
              }
            />
          ) : (
            <Text>cannot edit</Text>
          )}
        </Surface>
      </KeyboardAvoidingView>
    </>
  );
};

export default Group;
