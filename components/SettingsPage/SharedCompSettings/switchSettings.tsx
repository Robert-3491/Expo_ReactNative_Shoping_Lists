import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GestureHandlerRootView, Switch } from "react-native-gesture-handler";

const SwitchSettings = () => {
  return (
    <GestureHandlerRootView>
      <Switch />
    </GestureHandlerRootView>
  );
};

export default SwitchSettings;

const styles = StyleSheet.create({});
