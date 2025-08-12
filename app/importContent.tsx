import { StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ImportContentWrapper from "@/components/ImportContentPage/importContentWrapper";

const ImportContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImportContentWrapper />
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
