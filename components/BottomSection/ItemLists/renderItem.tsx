import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Item } from "@/data/models/item";
import { colors } from "@/assets/colors";
// eslint-disable-next-line import/no-named-as-default
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { isWhitespace } from "@/Utilities/textFormating";
import { ensureHttps } from "@/containers/addModalContainer";

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
        value={Boolean(item.isChecked)}
        color={colors.primaryLight}
        onValueChange={() => toggleIsChecked(item.id)}
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

      {!isWhitespace(item.link) && (
        <Pressable
          onPress={() => Linking.openURL(ensureHttps(item.link))}
          style={({ pressed }) => [
            styles.iconContainer,
            { opacity: pressed ? 0.4 : 1 },
          ]}
        >
          <Ionicons style={styles.openIcon} name="open-outline" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    //flex: 1,
    backgroundColor: colors.itemCard,
    alignItems: "center",
    borderRadius: 5,
  },

  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 8,
  },

  title: {
    fontSize: 18,
    color: colors.text,
    flex: 1,
    marginHorizontal: 5,
  },

  iconContainer: {
    paddingHorizontal: 7,
    height: "100%",
    borderRadius: 5,
    borderLeftWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: "center", // Centers vertically
  },

  openIcon: { fontSize: 30, color: colors.text },
});

export default RenderItem;
