import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SwitchSettings from "../SharedCompSettings/switchSettings";
import TextInputSettings from "./textInputSettings";
import {
  getCreateDefaultSection,
  toggleCreateDefaultSection,
  getDefaultSectionName,
} from "@/data/db/dbRepoSettings";
import * as settingsContainer from "@/containers/settingsContainer";
import SaveButton from "./saveButton";
import { colors } from "@/assets/colors";
import TextDefault from "../../SharedComponents/textDefault";

const MainListSettings = () => {
  const [createDefaultSection, setCreateDefaultSection] = useState(
    getCreateDefaultSection()
  );

  const [title, setTitle] = useState(getDefaultSectionName());

  const isTitleValid = (): boolean => {
    return settingsContainer.isTitleValidContainer(title);
  };

  return (
    <View>
      <TextDefault color={colors.primaryLight}>Main Lists</TextDefault>
      <View style={[styles.container, styles.marginTop]}>
        <TextDefault>Add a section after creating a list</TextDefault>
        <SwitchSettings
          state={createDefaultSection}
          setState={setCreateDefaultSection}
          updateFunction={toggleCreateDefaultSection}
        />
      </View>

      <View style={[styles.marginTop]}>
        <TextDefault>Default section title:</TextDefault>

        <View style={styles.textInputWrapper}>
          <TextInputSettings title={title} setTitle={setTitle} />
          {isTitleValid() && <SaveButton editTitle={title} />}
        </View>
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
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
    marginTop: 5,
  },
});
