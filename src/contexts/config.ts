import { createContext } from "react";
import { Config } from "../types";

export const defaultConfig: Config = {
  oobeComplete: false,
};

type ConfigContextValue = [Config | undefined, (value: Config | undefined) => void];

const configContext = createContext<ConfigContextValue>([defaultConfig, () => defaultConfig]);

export default configContext;
