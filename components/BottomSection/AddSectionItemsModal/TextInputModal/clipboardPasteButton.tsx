import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";
import { getClipboardText } from "@/containers/importContentContainer";

interface Props {
  setText: (val: string) => void;
}

const ClipboardPasteButton = ({ setText }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.4 : 1 },
      ]}
      onPress={async () => setText(await getClipboardText())}
    >
      <Ionicons name="clipboard" style={styles.icon} />
    </Pressable>
  );
};

export default ClipboardPasteButton;

const styles = StyleSheet.create({
  pressable: {
    justifyContent: "center",
    paddingLeft: 5,
  },
  icon: {
    color: colors.text,
    fontSize: 30,
  },
});
