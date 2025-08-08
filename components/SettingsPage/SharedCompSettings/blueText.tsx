import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  children: React.ReactNode;
}

const BlueText = ({ children }: Props) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default BlueText;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.primaryLight,
  },
});
