import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Item } from "@/data/models/item";
import { colors } from "@/assets/colors";
// eslint-disable-next-line import/no-named-as-default
import Checkbox from "expo-checkbox";

interface Props {
  item: Item;
}

const RenderItem: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Checkbox
        style={styles.checkbox}
        value={Boolean(item.isChecked)}
        color={colors.primaryLight}
        onValueChange={() => !item.isChecked}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "98%",
    backgroundColor: colors.borderLight,
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  checkbox: { width: 40, height: 40, borderRadius: 5 },
  title: { fontSize: 18, color: colors.text },
});

export default RenderItem;
