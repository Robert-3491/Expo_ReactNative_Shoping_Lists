import { TextInput, View } from "react-native";
import React, { useRef } from "react";
import TextInputModal from "./textInputModal";
import { colors } from "@/assets/colors";

interface Props {
  addingMode: string;
  addTitle: string;
  addLink: string;
  setAddTitle: (addTitle: string) => void;
  setAddLink: (addLink: string) => void;
  addItem: () => void;
  addSection: () => void;
}

const TextInputsWrapper: React.FC<Props> = ({
  addingMode,
  addTitle,
  addLink,
  setAddTitle,
  setAddLink,
  addItem,
  addSection,
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
        selectionColor={colors.primaryLight}
        onSubmitEditing={addingMode === "ITEM" ? focusNextInput : addSection}
        autofocus={true}
        addTitle={addTitle}
        setAddTitle={setAddTitle}
      />

      {addingMode === "ITEM" && (
        <TextInputModal
          placeholder="Link - optional"
          selectionColor={colors.primaryLight}
          ref={linkInputRef}
          selectTextOnFocus={true}
          onSubmitEditing={addItem}
          addLink={addLink}
          setAddLink={setAddLink}
        />
      )}
    </View>
  );
};

export default TextInputsWrapper;
