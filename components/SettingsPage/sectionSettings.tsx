import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import BlueText from "./SharedCompSettings/blueText";
import { colors } from "@/assets/colors";
import { getCountIncludesChecked } from "@/data/db/dbRepoSettings";
import { changeCountIncludeCount } from "@/containers/settingsContainer";

const SectionSettings = () => {
  const [countMode, setCountMode] = useState(getCountIncludesChecked());

  return (
    <View>
      <BlueText>Sections</BlueText>
      <TextSettings margin={{ marginTop: 10 }}>
        Mode for displaying item count:
      </TextSettings>

      <View style={styles.selectionWrapper}>
        <Pressable
          style={({ pressed }) => [
            styles.selectionTab,
            { opacity: pressed ? 0.4 : 1 },
            countMode && styles.active,
          ]}
          onPress={() => changeCountIncludeCount(true, setCountMode)}
        >
          <TextSettings margin={{ textAlign: "center" }}>
            X/X items checked
          </TextSettings>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.selectionTab,
            { marginLeft: 15, opacity: pressed ? 0.4 : 1 },
            !countMode && styles.active,
          ]}
          onPress={() => changeCountIncludeCount(false, setCountMode)}
        >
          <TextSettings margin={{ textAlign: "center" }}>X items</TextSettings>
        </Pressable>
      </View>
    </View>
  );
};

export default SectionSettings;

const styles = StyleSheet.create({
  selectionWrapper: {
    flexDirection: "row",
    marginTop: 10,
    paddingRight: 15,
  },
  selectionTab: {
    width: "50%",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 5,
  },
  active: {
    backgroundColor: colors.primary,
  },
});
