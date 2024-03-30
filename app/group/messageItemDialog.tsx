import { Dialog, List, Portal, useTheme } from "react-native-paper";
import { Message } from "../../src/types";
import ListIcon from "react-native-paper/lib/typescript/components/List/ListIcon";
import { View } from "react-native";
import { useState } from "react";
import ConfirmDeleteMessageDialog from "./confirmDeleteMessage";
import EditMessageDialog from "./editMessageDialog";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message;
}

const MessageItemDialog: React.FC<IProps> = ({ isOpen, setIsOpen, message }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  return (
    <>
      {!showDeleteDialog && !showEditDialog ? (
        <Portal>
          <Dialog visible={isOpen} onDismiss={handleClose}>
            <Dialog.Title>Message Actions</Dialog.Title>
            <View style={{ paddingHorizontal: 16 }}>
              <List.Section>
                <List.Item title="Edit" left={() => <List.Icon icon="pencil" />} onPress={handleEdit} />
                <List.Item
                  title="Delete"
                  left={() => <List.Icon color={theme.colors.error} icon="delete" />}
                  titleStyle={{ color: theme.colors.error }}
                  onPress={handleDelete}
                />
              </List.Section>
            </View>
          </Dialog>
        </Portal>
      ) : (
        <></>
      )}
      <ConfirmDeleteMessageDialog isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog} message={message} />
      <EditMessageDialog isOpen={showEditDialog} setIsOpen={setShowEditDialog} message={message} />
    </>
  );
};

export default MessageItemDialog;
