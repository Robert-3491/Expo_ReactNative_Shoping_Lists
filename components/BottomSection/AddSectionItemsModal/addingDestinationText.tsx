import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SectionList } from "@/data/models/sectionList";
import { colors } from "@/assets/colors";

interface Props {
  currentSectionList: SectionList;
  newList: boolean;
}

const AddingDestinationText: React.FC<Props> = ({
  currentSectionList,
  newList,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Adding to: <Text style={styles.title}>{currentSectionList.title}</Text>
        {newList ? null : <Text style={styles.new}> (new)</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 18, color: colors.textSecondary },
  title: { fontSize: 18, color: colors.text },
  new: { fontSize: 18, color: colors.success, fontWeight: "bold" },
  container: { marginBottom: 15 },
});

export default AddingDestinationText;
