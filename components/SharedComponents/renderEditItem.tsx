import React from "react";
import { Pressable, StyleSheet, ViewStyle, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";

interface Props {
  item: any;
  handleEdit: (item: any) => void;
  style?: ViewStyle;
  iconSize?: number;
}

const RenderEditItem: React.FC<Props> = ({
  item,
  handleEdit,
  style,
  iconSize = 27,
}) => (
  <View style={styles.leftActionContainer}>
    <Pressable onPress={() => handleEdit(item)}>
      <View style={styles.actionBase}>
        <Ionicons name="pencil" size={iconSize} color={colors.text} />
      </View>
    </Pressable>
    <View style={{ flex: 1 }} />
  </View>
);

// Stock styles
const styles = StyleSheet.create({
  leftActionContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.edit,
    marginRight: "-82%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  // Base style for both left and right actions
  actionBase: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
  },
});

export default RenderEditItem;
