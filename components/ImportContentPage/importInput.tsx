import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  inputText: string;
  setInputText: (val: string) => void;
}

const ImportInput = ({ inputText, setInputText }: Props) => {
  return (
    <View>
      <TextInput
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        style={styles.inputStyle}
        multiline={true}
      />
    </View>
  );
};

export default ImportInput;

const styles = StyleSheet.create({
  inputStyle: {
    color: colors.text,
    fontSize: 18,
    backgroundColor: colors.card,
    borderRadius: 5,
  },
});
