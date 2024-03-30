import { ActivityIndicator, Button, Dialog, Portal, useTheme } from "react-native-paper";
import { Collections, Message } from "../../src/types";
import pb from "../../src/pocketbase";
import { useState } from "react";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message;
}

const ConfirmDeleteMessageDialog: React.FC<IProps> = ({ isOpen, setIsOpen, message }) => {
  const [deleting, setDeleting] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    if (!deleting) {
      setDeleting(false);
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const status = await pb.collection(Collections.Messages).delete(message.id);
    if (status) {
      handleClose();
    } else {
      setDeleting(false);
      console.error(status);
    }
  };

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={handleClose}>
        <Dialog.Title>Delete Message?</Dialog.Title>
        <Dialog.Actions>
          <Button disabled={deleting} onPress={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={deleting}
            mode="contained"
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            style={{ paddingHorizontal: 8 }}
            onPress={handleDelete}
          >
            {deleting ? <ActivityIndicator /> : "Delete"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDeleteMessageDialog;
