import { StyleSheet, View } from "react-native";
import React from "react";
import Header from "../SharedComponents/header";
import TextDefault from "../SharedComponents/textDefault";
import CustomButton from "../SharedComponents/customButton";
import { colors } from "@/assets/colors";
import { handlePasteFromClipboard } from "@/containers/importContentContainer";

const ImportContentWrapper = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>Import content</Header>
      <View style={{ paddingHorizontal: 15 }}>
        <TextDefault margin={{ marginVertical: 15 }}>
          Add your content by pasting it below or using the paste button:
        </TextDefault>

        <CustomButton
          buttonText="Paste content from Clipboard"
          backgroundColor={colors.primaryLight}
          onPress={() => handlePasteFromClipboard()}
        ></CustomButton>
      </View>
    </View>
  );
};

export default ImportContentWrapper;

const styles = StyleSheet.create({});
