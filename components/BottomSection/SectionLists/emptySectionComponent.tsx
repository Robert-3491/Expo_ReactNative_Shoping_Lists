import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "@/assets/colors";
import TextInputModal from "../AddSectionItemsModal/TextInputModal/textInputModal";
import CustomButton from "../../SharedComponents/customButton";
import { getDefaultSectionName } from "@/data/db/dbRepoSettings";
import { addSection } from "@/containers/sectionListsContainer";
import { isMainListEmpty } from "@/containers/mainListsContainer";

const EmptySectionComponent = () => {
  const [title, setTitle] = useState(getDefaultSectionName());
  console.log(isMainListEmpty());

  return (
    <View style={styles.container}>
      {isMainListEmpty() ? (
        <Text style={[styles.text, styles.emptyText]}>
          Tap the menu above to add a new list
        </Text>
      ) : (
        <View>
          <Text style={styles.text}>Add a title for your section:</Text>
          <TextInputModal
            placeholder={"Section title (required)"}
            style={{ fontSize: 18 }}
            selectionColor={colors.primary}
            selectTextOnFocus={true}
            autofocus={true}
            onSubmitEditing={function (): void {
              addSection(title);
            }}
            addTitle={title}
            setAddTitle={setTitle}
          />
          <CustomButton
            buttonText={"Add Section"}
            onPress={function (): void {
              addSection(title);
            }}
            backgroundColor={colors.primaryLight}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    marginBottom: 10,
  },
  emptyText: {
    marginBottom: 5,
  },
});

export default EmptySectionComponent;
