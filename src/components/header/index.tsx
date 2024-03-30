import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode } from "react";
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

interface IProps<T extends ParamListBase> {
  navigation?: NativeStackNavigationProp<T>;
  title: ReactNode;
}

const Header = <T extends ParamListBase>({ title, navigation }: IProps<T>): ReactNode => {
  const theme = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.elevation.level1 }}>
      {navigation && navigation.canGoBack() ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.pop();
          }}
        />
      ) : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
