import { StyleSheet, View, Text } from "react-native";
import React from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import SwitchSettings from "./SharedCompSettings/switchSettings";
import BlueText from "./SharedCompSettings/blueText";

const ItemsSettings = () => {
  return (
    <View>
      <BlueText>Items</BlueText>
      <View style={styles.container}>
        <TextSettings>Send checked items to the bottom:</TextSettings>
        <SwitchSettings />
      </View>
    </View>
  );
};

export default ItemsSettings;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
});
