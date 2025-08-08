import { StyleSheet, View, Text } from "react-native";
import React from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import SwitchSettings from "./SharedCompSettings/switchSettings";
import BlueText from "./SharedCompSettings/blueText";

const GeneralSettings = () => {
  return (
    <View>
      <BlueText>General</BlueText>
      <View style={styles.container}>
        <TextSettings>Order content by newest:</TextSettings>
        <SwitchSettings />
      </View>
    </View>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
});
