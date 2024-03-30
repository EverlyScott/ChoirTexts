import { AvatarIconProps, AvatarImageProps, AvatarTextProps, Avatar as PaperAvatar } from "react-native-paper";
import pb from "../../pocketbase";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface IProps {
  record: { [key: string]: any };
  filename?: string;
  backupText?: string;
  textCharactersToDisplay?: number;
  backupIcon?: IconSource;
  avatarProps?: Omit<AvatarImageProps & AvatarTextProps & AvatarIconProps, "source" | "label" | "icon">;
}

const Avatar: React.FC<IProps> = ({
  record,
  filename,
  backupText,
  textCharactersToDisplay,
  backupIcon,
  avatarProps,
}) => {
  if (filename) {
    return <PaperAvatar.Image source={{ uri: pb.files.getUrl(record, filename) }} {...avatarProps} />;
  }

  if (backupText) {
    return (
      <PaperAvatar.Text
        label={backupText
          .split(" ")
          .map((word) => word[0])
          .splice(0, textCharactersToDisplay || 2)
          .join("")
          .toUpperCase()}
        {...avatarProps}
      />
    );
  }

  return <PaperAvatar.Icon icon={backupIcon ?? "account"} {...avatarProps} />;
};

export default Avatar;
