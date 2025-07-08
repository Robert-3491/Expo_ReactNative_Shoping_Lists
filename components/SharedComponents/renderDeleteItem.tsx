import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";

interface Props {
  item: any;
  handleDelete: (item: any) => void;
  style?: ViewStyle;
  iconSize?: number;
}

const RenderDeleteItem: React.FC<Props> = ({
  item,
  handleDelete,
  style,
  iconSize = 30,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const handleContainerWidth = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View
      style={[
        styles.rightActionContainer,
        { marginLeft: -(containerWidth - 50) },
        style,
      ]}
      onLayout={handleContainerWidth}
    >
      <View style={{ flex: 1 }} />
      <Pressable onPress={() => handleDelete(item)}>
        <View style={styles.actionBase}>
          <Ionicons name="trash" size={iconSize} color={colors.text} />
        </View>
      </Pressable>
    </View>
  );
};

// Stock styles
const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.delete,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  // Base style for both left and right actions
  actionBase: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
  },
});

export default RenderDeleteItem;
