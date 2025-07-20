import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { MainList } from "@/data/models/mainList";

interface Props {
  mainList: MainList;
  editText: string;
  setEditText: (val: string) => void;
  handleSaveEdit: (mainList: MainList) => void;
}

const EditMainListTextInput: React.FC<Props> = ({
  mainList,
  editText,
  setEditText,
  handleSaveEdit,
}) => {
  return (
    <TextInput
      selectTextOnFocus={true}
      autoCorrect={false}
      selectionColor={colors.edit}
      autoFocus={true}
      value={editText}
      onFocus={() => {
        setEditText(mainList.title); // Set the text input value to the current title when focused
      }}
      onChangeText={(text) => setEditText(text)}
      onBlur={() => handleSaveEdit(mainList)}
      onSubmitEditing={() => handleSaveEdit(mainList)}
      style={[
        styles.itemText,
        styles.itemEdit,
        {
          backgroundColor: mainList.isActive
            ? colors.primary
            : colors.borderLight,
        },
      ]}
    />
  );
};

export default EditMainListTextInput;

const styles = StyleSheet.create({
  itemText: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 20,
    width: "100%",
    borderRadius: 5,
  },
  itemEdit: {
    borderWidth: 1.5,
    borderColor: colors.edit,
  },
});
