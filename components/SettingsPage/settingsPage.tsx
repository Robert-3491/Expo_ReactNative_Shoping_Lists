import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import Header from "../SharedComponents/header";
import { colors } from "@/assets/colors";
import GeneralSettings from "./generalSettings";
import MainListSettings from "./MainListSettings/mainListSettings";
import SectionSettings from "./sectionSettings";
import ItemsSettings from "./itemsSettings";
import NavigationButtons from "./navigationButtons";

const SettingsPage = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Header showBack={true}>App Settings</Header>

        <View style={[styles.border, styles.paddingHorizontal]}>
          <GeneralSettings />
        </View>

        <View style={[styles.border, styles.paddingHorizontal]}>
          <MainListSettings />
        </View>

        <View style={[styles.border, styles.paddingHorizontal]}>
          <SectionSettings />
        </View>

        <View style={[styles.border, styles.paddingHorizontal]}>
          <ItemsSettings />
        </View>

        <View style={styles.paddingHorizontal}>
          <NavigationButtons />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  paddingLeft: {
    paddingLeft: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  border: {
    borderBottomWidth: 2,
    borderColor: colors.border,
    paddingVertical: 20,
  },
});
