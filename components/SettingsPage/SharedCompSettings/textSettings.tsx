import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const TextSettings = ({ children }: Props) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export default TextSettings;

const styles = StyleSheet.create({});
