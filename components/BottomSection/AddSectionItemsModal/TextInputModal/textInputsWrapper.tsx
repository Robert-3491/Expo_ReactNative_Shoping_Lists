import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import TextInputModal from "./textInputModal";

interface Props {
  addingMode: string;
  addTitle: string;
  addLink: string;
  setAddTitle: (addTitle: string) => void;
  setAddLink: (addLink: string) => void;
}

const TextInputsWrapper: React.FC<Props> = ({
  addingMode,
  addTitle,
  addLink,
  setAddTitle,
  setAddLink,
}) => {
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
        autofocus={true}
        addTitle={addTitle}
        setAddTitle={setAddTitle}
      />

      {addingMode === "ITEM" && (
        <TextInputModal
          placeholder="Link - optional"
          ref={linkInputRef}
          selectTextOnFocus={true}
          onSubmitEditing={() => console.log("not implementd")}
          addLink={addLink}
          setAddLink={setAddLink}
        />
      )}
    </View>
  );
};

export default TextInputsWrapper;

const styles = StyleSheet.create({});
