import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../SharedComponents/header";
import TextDefault from "../SharedComponents/textDefault";
import CustomButton from "../SharedComponents/customButton";
import { colors } from "@/assets/colors";
import {
  getClipboardText,
  importContentController,
} from "@/containers/importContentContainer";
import ImportInput from "./importInput";
import LoadingSpinner from "@/Utilities/loadingSpinner";
import { showSuccess } from "@/Utilities/messages";

const ImportContentWrapper = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadClipboard = async () => {
      setInputText(await getClipboardText());
    };
    loadClipboard();
  }, []);

  const longPress = async () => {
    setInputText(`${inputText}\n${await getClipboardText()}`);
    showSuccess("Content added");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Header showHome={true}>Import content</Header>
      <View style={styles.content}>
        <TextDefault
          color={colors.textSecondary}
          margin={{ marginVertical: 10 }}
        >
          Press the Paste button to replace with your clipboard content.{`\n`}
          Long press to add. Multiple lists are allowed.
        </TextDefault>

        <CustomButton
          buttonText="Paste from Clipboard"
          fontSize={18}
          backgroundColor={colors.primaryLight}
          onPress={async () => setInputText(await getClipboardText())}
          onLongPress={() => longPress()}
        />

        <ImportInput inputText={inputText} setInputText={setInputText} />

        <CustomButton
          buttonText="Import"
          fontSize={18}
          backgroundColor={colors.successToast}
          onPress={() =>
            importContentController(inputText, setIsLoading, setInputText)
          }
        />
      </View>
    </View>
  );
};

export default ImportContentWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 5,
    flex: 1,
  },
});
