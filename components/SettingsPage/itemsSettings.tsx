import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import SwitchSettings from "./SharedCompSettings/switchSettings";
import BlueText from "./SharedCompSettings/blueText";
import { getOrderByChecked } from "@/data/db/dbRepoSettings";
import { toggleSetOrderByCheckedContainer } from "@/containers/settingsContainer";

const ItemsSettings = () => {
  const [orderByChecked, setOrderByChecked] = useState(getOrderByChecked());
  return (
    <View>
      <BlueText>Items</BlueText>
      <View style={styles.container}>
        <TextSettings>Send checked items to the bottom:</TextSettings>
        <SwitchSettings
          state={orderByChecked}
          setState={setOrderByChecked}
          updateFunction={toggleSetOrderByCheckedContainer}
        />
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
