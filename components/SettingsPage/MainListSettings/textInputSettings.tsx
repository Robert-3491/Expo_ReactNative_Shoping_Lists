import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";

const TextInputSettings = () => {
  return <TextInput style={styles.textInput} />;
};

export default TextInputSettings;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    marginTop: 5,
    borderColor: colors.primary,
    borderWidth: 2,
    width: "65%",
    height: "auto",
    borderRadius: 5,
  },
});
