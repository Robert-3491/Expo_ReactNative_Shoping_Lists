import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import BlueText from "../SharedCompSettings/blueText";
import TextSettings from "../SharedCompSettings/textSettings";
import SwitchSettings from "../SharedCompSettings/switchSettings";
import TextInputSettings from "./textInputSettings";
import {
  getCreateDefaultSection,
  toggleCreateDefaultSection,
  getDefaultSectionName,
} from "@/data/db/dbRepoSettings";
import * as settingsContainer from "@/containers/settingsContainer";
import SaveButton from "./saveButton";

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
      <BlueText>Main Lists</BlueText>
      <View style={[styles.container, styles.marginTop]}>
        <TextSettings>Add a section after creating a list</TextSettings>
        <SwitchSettings
          state={createDefaultSection}
          setState={setCreateDefaultSection}
          updateFunction={toggleCreateDefaultSection}
        />
      </View>

      <View style={[styles.marginTop]}>
        <TextSettings>Default section title:</TextSettings>

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
