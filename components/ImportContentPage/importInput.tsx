import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  inputText: string;
  setInputText: (val: string) => void;
}

const ImportInput = ({ inputText, setInputText }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        style={styles.inputStyle}
        multiline={true}
        autoCorrect={false}
        selectTextOnFocus={true}
      />
    </View>
  );
};

export default ImportInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    color: colors.text,
    fontSize: 18,
    backgroundColor: colors.card,
    borderRadius: 5,
    flex: 1,
    padding: 5,
    marginVertical: 5,
    textAlignVertical: "top",
  },
});
