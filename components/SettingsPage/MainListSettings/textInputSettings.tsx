import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { getDefaultSectionName } from "@/data/db/dbRepoSettings";

interface Props {
  title: string;
  setTitle: (val: string) => void;
}

const TextInputSettings = ({ title, setTitle }: Props) => {
  return (
    <TextInput
      style={styles.textInput}
      value={title}
      onChangeText={(txt) => setTitle(txt)}
      selectTextOnFocus={true}
      onBlur={() => setTitle(getDefaultSectionName())}
    />
  );
};

export default TextInputSettings;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderColor: colors.border,
    borderWidth: 2,
    width: "65%",
    height: "auto",
    borderRadius: 5,
    color: colors.text,
  },
});
