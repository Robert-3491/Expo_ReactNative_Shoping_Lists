import { StyleSheet, Text, View } from "react-native";
import React from "react";
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
}

const UpdateInputsWrapper: React.FC<Props> = ({
  updateTitle,
  setUpdateTitle,
  updateLink,
  setUpdateLink,
  item,
}) => {
  return (
    <View>
      <TextInputModal
        placeholder="Update Title"
        selectionColor={colors.edit}
        autofocus={true}
        selectTextOnFocus={true}
        style={{ borderColor: colors.edit }}
        onSubmitEditing={() => console.log("Works")}
        addTitle={updateTitle}
        setAddTitle={setUpdateTitle}
      />

      {item && (
        <TextInputModal
          placeholder="Update Link"
          selectionColor={colors.edit}
          selectTextOnFocus={true}
          style={{ borderColor: colors.edit }}
          onSubmitEditing={() => console.log("Works")}
          addLink={updateLink}
          setAddLink={setUpdateLink}
        />
      )}
    </View>
  );
};

export default UpdateInputsWrapper;

const styles = StyleSheet.create({});
