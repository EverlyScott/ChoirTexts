import { Text } from "react-native";
import Header from "../../src/components/header";
import { Button } from "react-native-paper";
import { useContext, useEffect, useMemo } from "react";
import configContext from "../../src/contexts/config";

const Debug: React.FC = () => {
  const [config, setConfig] = useContext(configContext);

  useEffect(() => {
    console.log(config);
  }, [config]);

  return (
    <>
      <Header title="Debug" />
      <Button
        mode="contained"
        onPress={() => {
          const newConfig = Object.assign({}, config);
          newConfig.oobeComplete = false;
          setConfig(newConfig);
        }}
      >
        Reset OOBE
      </Button>
    </>
  );
};

export default Debug;
