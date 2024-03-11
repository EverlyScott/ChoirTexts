import { Text } from "react-native";
import Header from "../../src/components/header";
import { Button } from "react-native-paper";
import { useContext } from "react";
import configContext from "../../src/contexts/config";

const Debug: React.FC = () => {
  const [config, setConfig] = useContext(configContext);

  return (
    <>
      <Header title="Debug" />
      <Button
        mode="contained"
        onPress={() => {
          config.oobeComplete = false;
          setConfig(config);
        }}
      >
        Reset OOBE
      </Button>
    </>
  );
};

export default Debug;
