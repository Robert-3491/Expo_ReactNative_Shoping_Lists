import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import TextInputModal from "./textInputModal";

interface Props {
  addingMode: string;
}

const TextInputsWrapper: React.FC<Props> = ({ addingMode }) => {
  const linkInputRef = useRef<TextInput>(null);

  const focusNextInput = () => {
    linkInputRef.current?.focus();
  };
  return (
    <View>
      <TextInputModal
        placeholder={
          addingMode === "ITEM"
            ? "Item title - required"
            : "Section title - required"
        }
        onSubmitEditing={focusNextInput}
      />

      {addingMode === "ITEM" && (
        <TextInputModal
          placeholder="Link - optional"
          ref={linkInputRef}
          selectTextOnFocus={true}
          onSubmitEditing={() => console.log("not implementd")}
        />
      )}
    </View>
  );
};

export default TextInputsWrapper;

const styles = StyleSheet.create({});
