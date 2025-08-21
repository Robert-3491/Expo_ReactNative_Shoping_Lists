import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import TextDefault from "../SharedComponents/textDefault";
import { importInputPlaceholder } from "@/Utilities/importPageFormating";

interface Props {
  inputText: string;
  setInputText: (val: string) => void;
}

const ImportInput = ({ inputText, setInputText }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <TextDefault>{inputText || importInputPlaceholder}</TextDefault>
    </ScrollView>
  );
};

export default ImportInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
});
