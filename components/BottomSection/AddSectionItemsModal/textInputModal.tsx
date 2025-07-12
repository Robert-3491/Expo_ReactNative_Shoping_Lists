import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import React, { forwardRef, useState } from "react";
import { colors } from "@/assets/colors";

interface Props {
  placeholder: string;
  style?: ViewStyle;
  selectTextOnFocus?: boolean;
  onSubmitEditing: () => void;
}

const TextInputModal = forwardRef<TextInput, Props>(
  (
    { placeholder, onSubmitEditing, selectTextOnFocus = false, style },
    ref?
  ) => {
    const [focus, setFocus] = useState(false);

    return (
      <View style={[styles.container, style]}>
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
        />
      </View>
    );
  }
);
TextInputModal.displayName = "TextInputModal";

const styles = StyleSheet.create({
  container: {},
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    color: colors.text,
    fontSize: 18,
  },
  activeBorder: { borderColor: colors.primaryLight },
});

export default TextInputModal;
