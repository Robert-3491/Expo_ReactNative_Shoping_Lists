import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderSettings from "./headerSettings";
import { colors } from "@/assets/colors";
import TextSettings from "./SharedCompSettings/textSettings";
import SecondaryText from "./SharedCompSettings/secondaryText";

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.paddingLeft, styles.header]}>
        <HeaderSettings />
      </View>

      <View style={[styles.paddingLeft, styles.notice]}>
        <SecondaryText>
          *Please restart the app to see the changes
        </SecondaryText>
      </View>

      <TextSettings>bla bla</TextSettings>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  header: {
    backgroundColor: colors.card,
  },
  notice: {
    paddingVertical: 10,
  },
});
