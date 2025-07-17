import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Item } from "@/data/models/item";
import { colors } from "@/assets/colors";
// eslint-disable-next-line import/no-named-as-default
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import * as itemsContainer from "@/containers/itemsContainer";

interface Props {
  item: Item;
  toggleIsChecked: (id: number) => void;
}

const RenderItem: React.FC<Props> = ({ item, toggleIsChecked }) => {
  // componenent start

  return (
    <View style={styles.itemContainer}>
      <Checkbox
        style={styles.checkbox}
        value={Boolean(item.isChecked)} // Use item.isChecked directly
        color={colors.primaryLight}
        onValueChange={
          () => toggleIsChecked(item.id) // Simplified call
        }
      />

      <Text
        selectable={true}
        style={[
          { textDecorationLine: item.isChecked ? "line-through" : "none" },
          styles.title,
        ]}
      >
        {item.title}
      </Text>

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
    flex: 1,
    backgroundColor: colors.itemCard,
    alignItems: "center",
    borderRadius: 5,
  },

  checkbox: { width: 30, height: 30, borderRadius: 5, margin: 5 },

  title: {
    fontSize: 18,
    color: colors.text,
    flex: 1,
    marginHorizontal: 5,
  },

  openIcon: { fontSize: 30, color: colors.text },
  iconContainer: {
    padding: 7,
    borderRadius: 5,
    borderLeftWidth: 2,
    borderColor: colors.textSecondary,
  },
});

export default RenderItem;
