import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInputModal from "../AddSectionItemsModal/TextInputModal/textInputModal";
import { colors } from "@/assets/colors";

const UpdateInputsWrapper = () => {
  return (
    <View>
      <TextInputModal
        placeholder="Update Title"
        selectionColor={colors.edit}
        onSubmitEditing={() => console.log("Works")}
        autofocus={true}
        selectTextOnFocus={true}
        style={{ borderColor: colors.edit }}
      />
      <TextInputModal
        placeholder="Update Link"
        selectionColor={colors.edit}
        onSubmitEditing={() => console.log("Works")}
        selectTextOnFocus={true}
        style={{ borderColor: colors.edit }}
      />
    </View>
  );
};

export default UpdateInputsWrapper;

const styles = StyleSheet.create({});
