import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { createContext } from "react";

type NavigationPropsBase = {
  [key: string]: any;
};

const createNavigationContext = <T extends NavigationPropsBase, Path extends string>() => {
  return createContext<NativeStackScreenProps<T, Path> | undefined>(undefined);
};

export default createNavigationContext;
