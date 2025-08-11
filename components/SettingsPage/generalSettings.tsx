import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import SwitchSettings from "./SharedCompSettings/switchSettings";
import BlueText from "./SharedCompSettings/blueText";
import { getOrderByNew } from "@/data/db/dbRepoSettings";
import { toggleDisplayOrderContainer } from "@/containers/settingsContainer";

const GeneralSettings = () => {
  const [orderByNew, setOrderByNew] = useState(getOrderByNew());

  return (
    <View>
      <BlueText>General</BlueText>
      <View style={styles.container}>
        <TextSettings>Order content by newest/oldest:</TextSettings>
        <SwitchSettings
          state={orderByNew}
          setState={setOrderByNew}
          updateFunction={toggleDisplayOrderContainer}
        />
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
