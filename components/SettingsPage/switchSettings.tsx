import React from "react";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";

interface Props {
  state: boolean;
  setState: (val: boolean) => void;
  updateFunction: () => void;
}

const SwitchSettings = ({ state, setState, updateFunction }: Props) => {
  const onValueChange = () => {
    setState(!state);
    updateFunction();
  };

  return (
    <GestureHandlerRootView>
      <Switch value={state} onValueChange={() => onValueChange()} />
    </GestureHandlerRootView>
  );
};

export default SwitchSettings;
