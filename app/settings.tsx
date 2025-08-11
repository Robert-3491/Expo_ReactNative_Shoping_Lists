import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import SettingsPage from "@/components/SettingsPage/settingsPage";

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SettingsPage />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
