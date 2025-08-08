import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  children: React.ReactNode;
  margin?: TextStyle;
}

const TextSettings = ({ children, margin }: Props) => {
  return (
    <View>
      <Text style={[styles.text, margin]}>{children}</Text>
    </View>
  );
};

export default TextSettings;

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 20,
  },
});
