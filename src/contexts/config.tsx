import { createContext, useEffect, useState } from "react";
import { Config } from "../types";
import storage from "../storage";

export const defaultConfig: Config = {
  oobeComplete: false,
};

type ConfigContextValue = [Config | undefined, (value: Config | undefined) => Promise<void>];

const configContext = createContext<ConfigContextValue>([defaultConfig, async () => {}]);

export const ConfigContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<Config>({ oobeComplete: true });

  useEffect(() => {
    async () => {
      const newConfig = await storage.load({ key: "config" });
      if (newConfig) {
        setConfig(newConfig);
      }
    };
  }, []);

  useEffect(() => {
    console.log(config);
  }, [config]);

  const handleUpdateConfig = async (newConfig: Config) => {
    // console.log(newConfig);
    await storage.save({ key: "config", data: newConfig, expires: null });
    setConfig(newConfig);
  };

  return <configContext.Provider value={[config, handleUpdateConfig]}>{children}</configContext.Provider>;
};

export default configContext;
