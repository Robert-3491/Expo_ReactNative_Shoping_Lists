import { StyleSheet, View } from "react-native";
import React from "react";
import TextSettings from "./SharedCompSettings/textSettings";
import BlueText from "./SharedCompSettings/blueText";
import { colors } from "@/assets/colors";

const SectionSettings = () => {
  return (
    <View>
      <BlueText>Sections</BlueText>
      <TextSettings margin={{ marginTop: 10 }}>
        Mode for displaying item count:
      </TextSettings>

      <View style={styles.selectionWrapper}>
        <View style={styles.selectionTab}>
          <TextSettings margin={{ textAlign: "center" }}>
            X/X items checked
          </TextSettings>
        </View>

        <View style={[styles.selectionTab, { marginLeft: "1%" }]}>
          <TextSettings margin={{ textAlign: "center" }}>X items</TextSettings>
        </View>
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
    width: "49.5%",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 5,
  },
});
