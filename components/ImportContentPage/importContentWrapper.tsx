import { StyleSheet, View } from "react-native";
import React from "react";
import Header from "../SharedComponents/header";
import TextDefault from "../SharedComponents/textDefault";
import CustomButton from "../SharedComponents/customButton";
import { colors } from "@/assets/colors";
import { getClipboardText } from "@/containers/importContentContainer";
import ImportInput from "./importInput";
import { useClipboard } from "@react-native-clipboard/clipboard";

const ImportContentWrapper = () => {
  const [inputText, setInputText] = useClipboard(); // it's actualy the fucking clipboard, setInputText changes the fucking clipboard..wow

  return (
    <View style={{ flex: 1 }}>
      <Header>Import content</Header>
      <View style={{ paddingHorizontal: 15 }}>
        <TextDefault
          color={colors.textSecondary}
          margin={{ marginVertical: 10 }}
        >
          Press the Paste button to replace the input content with your
          clipboard content.{`\n`}Long press to add. Multiple lists are allowed.
        </TextDefault>

        <CustomButton
          buttonText="Paste from Clipboard"
          fontSize={18}
          backgroundColor={colors.primaryLight}
          onPress={async () => setInputText(await getClipboardText())}
        ></CustomButton>

        <ImportInput inputText={inputText} setInputText={setInputText} />
      </View>
    </View>
  );
};

export default ImportContentWrapper;

const styles = StyleSheet.create({});
