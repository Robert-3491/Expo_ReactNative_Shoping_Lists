import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import TextInputModal from "../AddSectionItemsModal/TextInputModal/textInputModal";
import { colors } from "@/assets/colors";
import { Item } from "@/data/models/item";
import { SectionList } from "@/data/models/sectionList";

interface Props {
  updateTitle: string;
  setUpdateTitle: (val: string) => void;
  updateLink: string;
  setUpdateLink: (val: string) => void;
  item?: Item;
  modalUpdateItem: () => void;
  modalUpdateSection: () => void;
}

const UpdateInputsWrapper: React.FC<Props> = ({
  updateTitle,
  setUpdateTitle,
  updateLink,
  setUpdateLink,
  item,
  modalUpdateItem,
  modalUpdateSection,
}) => {
  // comp start

  const titleInputRef = useRef<TextInput>(null);
  const linkInputRef = useRef<TextInput>(null);

  const focusNextInput = () => {
    linkInputRef.current?.focus();
  };

  return (
    <View>
      <TextInputModal
        placeholder="Update Title"
        selectionColor={colors.edit}
        autofocus={true}
        selectTextOnFocus={true}
        style={{ borderColor: colors.edit }}
        onSubmitEditing={() => (item ? focusNextInput() : modalUpdateSection())}
        addTitle={updateTitle}
        setAddTitle={setUpdateTitle}
        ref={titleInputRef}
      />

      {item && (
        <TextInputModal
          placeholder="Update Link"
          selectionColor={colors.edit}
          selectTextOnFocus={true}
          style={{ borderColor: colors.edit }}
          onSubmitEditing={() => modalUpdateItem()}
          addLink={updateLink}
          setAddLink={setUpdateLink}
          autofocus={false}
          ref={linkInputRef}
        />
      )}
    </View>
  );
};

export default UpdateInputsWrapper;

const styles = StyleSheet.create({});
