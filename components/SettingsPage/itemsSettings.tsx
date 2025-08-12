import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SwitchSettings from "./SharedCompSettings/switchSettings";
import { getOrderByChecked } from "@/data/db/dbRepoSettings";
import { toggleSetOrderByCheckedContainer } from "@/containers/settingsContainer";
import TextDefault from "../SharedComponents/textDefault";
import { colors } from "@/assets/colors";

const ItemsSettings = () => {
  const [orderByChecked, setOrderByChecked] = useState(getOrderByChecked());
  return (
    <View>
      <TextDefault color={colors.primaryLight}>Items</TextDefault>
      <View style={styles.container}>
        <TextDefault>Send checked items to the bottom:</TextDefault>
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
