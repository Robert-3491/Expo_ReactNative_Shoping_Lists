import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { saveDefaultSectionTitleValidation } from "@/containers/settingsContainer";

interface Props {
  editTitle: string;
}

const SaveButton = ({ editTitle }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.4 : 1 },
      ]}
      onPress={() => saveDefaultSectionTitleValidation(editTitle)}
    >
      <Text style={styles.buttonText}>Save</Text>
    </Pressable>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    width: "35%",
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    marginLeft: 15,
    height: 45,
  },
  buttonText: {
    fontSize: 18,
    color: colors.text,
  },
});
