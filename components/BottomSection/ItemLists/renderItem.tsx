import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Item } from "@/data/models/item";
import { colors } from "@/assets/colors";
// eslint-disable-next-line import/no-named-as-default
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

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

      <Pressable
        style={({ pressed }) => [
          styles.iconContainer,
          { opacity: pressed ? 0.4 : 1 },
        ]}
      >
        <Ionicons style={styles.openIcon} name="open-outline" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "97%",
    backgroundColor: colors.itemCard,
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  checkbox: { width: 30, height: 30, borderRadius: 5, margin: 5 },
  title: { fontSize: 18, color: colors.text, flex: 1, marginHorizontal: 5 },
  openIcon: { fontSize: 30, color: colors.text },
  iconContainer: {
    padding: 7,
    borderRadius: 5,
    borderLeftWidth: 2,
    borderColor: colors.textSecondary,
  },
});

export default RenderItem;
