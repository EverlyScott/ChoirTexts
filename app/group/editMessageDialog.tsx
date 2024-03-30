import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Collections, Message } from "../../src/types";
import { KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions } from "react-native";
import { Key, useRef, useState } from "react";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard } from "@react-native-community/hooks";
import pb from "../../src/pocketbase";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message;
}

const EditMessageDialog: React.FC<IProps> = ({ isOpen, setIsOpen, message }) => {
  const [editedMessage, setEditedMessage] = useState(message.text);
  const windowDimensions = useWindowDimensions();
  const keyboardSize = useKeyboard();

  const handleMessageChange = (newVal: string) => {
    console.log(newVal);
    setEditedMessage(newVal);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEdit = async () => {
    try {
      await pb.collection(Collections.Messages).update<Message>(message.id, { text: editedMessage } as Message);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (isOpen) {
    return (
      <Portal>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flexGrow: 1 }}>
          <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardDismissMode="interactive">
            <Dialog visible={isOpen} onDismiss={handleClose} style={{ maxHeight: "100%" }}>
              <Dialog.Title>Edit Message</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Edit Message"
                  enablesReturnKeyAutomatically
                  multiline
                  defaultValue={editedMessage}
                  onChangeText={handleMessageChange}
                  style={{
                    marginHorizontal: 8,
                    maxHeight: keyboardSize.keyboardShown
                      ? windowDimensions.height - keyboardSize.keyboardHeight - 256
                      : undefined,
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleClose}>Cancel</Button>
                <Button mode="contained" onPress={handleEdit} style={{ paddingHorizontal: 8 }}>
                  Edit
                </Button>
              </Dialog.Actions>
            </Dialog>
          </ScrollView>
        </KeyboardAvoidingView>
      </Portal>
    );
  }
};

export default EditMessageDialog;
