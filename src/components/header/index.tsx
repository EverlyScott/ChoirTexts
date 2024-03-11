import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode } from "react";
import { Appbar } from "react-native-paper";

interface IProps<T extends ParamListBase> {
  navigation?: NativeStackNavigationProp<T>;
  title: ReactNode;
}

const Header = <T extends ParamListBase>({ title, navigation }: IProps<T>): ReactNode => {
  return (
    <Appbar.Header>
      {navigation && navigation.canGoBack() && (
        <Appbar.BackAction
          onPress={() => {
            navigation.pop();
          }}
        />
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default Header;
