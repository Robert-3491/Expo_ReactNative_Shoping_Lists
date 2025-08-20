import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  inputText: string;
  setInputText: (val: string) => void;
}

const ImportInput = ({ inputText, setInputText }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textStyle}>{inputText || "No content"}</Text>
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
  textStyle: {
    color: colors.text,
    fontSize: 18,
  },
});
