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

const ImportContentWrapper = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadClipboard = async () => {
      setInputText(await getClipboardText());
    };
    loadClipboard();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Header>Import content</Header>
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
          onLongPress={async () =>
            setInputText(`${inputText}\n${await getClipboardText()}`)
          }
        />

        <ImportInput inputText={inputText} setInputText={setInputText} />

        <CustomButton
          buttonText="Import"
          fontSize={18}
          backgroundColor={colors.successToast}
          onPress={() => importContentController(inputText, setIsLoading)}
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
