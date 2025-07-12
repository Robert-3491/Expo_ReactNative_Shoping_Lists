import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SectionList } from "@/data/models/sectionList";
import { colors } from "@/assets/colors";

interface Props {
  currentSectionList: SectionList;
}

const AddingDestinationText: React.FC<Props> = ({ currentSectionList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Adding to: <Text style={styles.title}>{currentSectionList.title}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 18, color: colors.textSecondary },
  title: { fontSize: 18, color: colors.text },
  container: { marginBottom: 15 },
});

export default AddingDestinationText;
