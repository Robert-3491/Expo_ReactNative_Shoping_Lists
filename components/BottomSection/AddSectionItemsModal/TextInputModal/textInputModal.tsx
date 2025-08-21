import {
  ColorValue,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import { colors } from "@/assets/colors";
import ClipboardPasteButton from "./clipboardPasteButton";

interface Props {
  placeholder: string;
  selectionColor: ColorValue;
  autofocus: boolean;
  selectTextOnFocus?: boolean;
  onSubmitEditing: () => void;
  addTitle?: string;
  setAddTitle?: (addTitle: string) => void;
  addLink?: string;
  setAddLink?: (addLink: string) => void;
  style?: TextStyle;
  copyFromClipboard?: boolean;
}

const TextInputModal = forwardRef<TextInput, Props>(
  (
    {
      placeholder,
      selectionColor,
      onSubmitEditing,
      selectTextOnFocus = false,
      autofocus = false,
      addTitle,
      addLink,
      setAddTitle,
      setAddLink,
      style,
      copyFromClipboard,
    },
    ref?
  ) => {
    //comp start

    const [focus, setFocus] = useState(false);

    useEffect(() => {
      if (autofocus) {
        setTimeout(() => {
          if (ref && typeof ref === "object" && "current" in ref) {
            ref.current?.focus();
          }
        }, 100);
      }
    }, [autofocus, ref]);

    return (
      <View style={[styles.container]}>
        <TextInput
          style={[styles.textInput, focus && [styles.activeBorder, style]]}
          onFocus={() => setFocus(true)}
          selectionColor={selectionColor}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          selectTextOnFocus={selectTextOnFocus}
          value={addTitle ? addTitle : addLink}
          onChangeText={(text) =>
            setAddTitle
              ? setAddTitle(text)
              : setAddLink
              ? setAddLink(text)
              : null
          }
        />
        {copyFromClipboard && (setAddTitle || setAddLink) && (
          <ClipboardPasteButton setText={setAddTitle || setAddLink!} />
        )}
      </View>
    );
  }
);
TextInputModal.displayName = "TextInputModal";

const styles = StyleSheet.create({
  container: { marginBottom: 10, flexDirection: "row" },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    color: colors.text,
    fontSize: 18,
    flex: 1,
  },
  activeBorder: { borderColor: colors.primaryLight, borderWidth: 2 },
});

export default TextInputModal;
