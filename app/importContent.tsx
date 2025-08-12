import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ImportContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>aesfwsefg</Text>
    </SafeAreaView>
  );
};

export default ImportContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
