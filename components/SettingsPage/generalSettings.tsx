import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SwitchSettings from "./switchSettings";
import { getOrderByNew } from "@/data/db/dbRepoSettings";
import { toggleDisplayOrderContainer } from "@/containers/settingsContainer";
import TextDefault from "../SharedComponents/textDefault";
import { colors } from "@/assets/colors";

const GeneralSettings = () => {
  const [orderByNew, setOrderByNew] = useState(getOrderByNew());

  return (
    <View>
      <TextDefault color={colors.primaryLight}>General</TextDefault>
      <View style={styles.container}>
        <TextDefault>Order content by newest/oldest:</TextDefault>
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
