import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import SettingsPage from "@/components/SettingsPage/settingsPage";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/Utilities/toastConfig";

const Settings = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <SettingsPage />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
