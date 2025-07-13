import { StyleSheet, TextInput, View } from "react-native";
import React, { forwardRef, useState } from "react";
import { colors } from "@/assets/colors";

interface Props {
  placeholder: string;
  autofocus?: boolean;
  selectTextOnFocus?: boolean;
  onSubmitEditing: () => void;
  addTitle?: string;
  setAddTitle?: (addTitle: string) => void;
  addLink?: string;
  setAddLink?: (addLink: string) => void;
}

const TextInputModal = forwardRef<TextInput, Props>(
  (
    {
      placeholder,
      onSubmitEditing,
      selectTextOnFocus = false,
      autofocus = false,
      addTitle,
      addLink,
      setAddTitle,
      setAddLink,
    },
    ref?
  ) => {
    const [focus, setFocus] = useState(false);

    return (
      <View style={[styles.container]}>
        <TextInput
          style={[styles.textInput, focus && styles.activeBorder]}
          onFocus={() => setFocus(true)}
          selectionColor={colors.primaryLight}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          selectTextOnFocus={selectTextOnFocus}
          autoFocus={autofocus}
          value={addTitle ? addTitle : addLink}
          onChangeText={(text) =>
            setAddTitle
              ? setAddTitle(text)
              : setAddLink
              ? setAddLink(text)
              : null
          }
        />
      </View>
    );
  }
);
TextInputModal.displayName = "TextInputModal";

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    color: colors.text,
    fontSize: 18,
  },
  activeBorder: { borderColor: colors.primaryLight, borderWidth: 2 },
});

export default TextInputModal;
