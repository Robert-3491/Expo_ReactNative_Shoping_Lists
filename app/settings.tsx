import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

const Settings = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text>bla lba settings</Text>
      </SafeAreaView>
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
