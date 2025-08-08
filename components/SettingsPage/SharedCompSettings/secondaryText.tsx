import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  children: React.ReactNode;
}

const SecondaryText = ({ children }: Props) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default SecondaryText;

const styles = StyleSheet.create({
  text: {
    width: "100%",
    color: colors.textSecondary,
    fontSize: 18,
    paddingTop: 10,
  },
});
