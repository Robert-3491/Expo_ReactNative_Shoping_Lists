import { StyleSheet, View } from "react-native";
import React from "react";
import BlueText from "../SharedCompSettings/blueText";
import TextSettings from "../SharedCompSettings/textSettings";
import SwitchSettings from "../SharedCompSettings/switchSettings";

import TextInputSettings from "./textInputSettings";

const MainListSettings = () => {
  return (
    <View>
      <BlueText>Main Lists</BlueText>
      <View style={[styles.container, styles.marginTop]}>
        <TextSettings>Add a section after creating a list</TextSettings>
        <SwitchSettings />
      </View>

      <View style={[styles.marginTop]}>
        <TextSettings>Default section title:</TextSettings>
        <TextInputSettings />
      </View>
    </View>
  );
};

export default MainListSettings;

const styles = StyleSheet.create({
  marginTop: { marginTop: 10 },
  container: {
    flexDirection: "row",
  },
});
