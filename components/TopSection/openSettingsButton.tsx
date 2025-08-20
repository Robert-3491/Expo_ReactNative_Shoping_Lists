import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";
import { router } from "expo-router";

const OpenSettingsButton = () => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.4 : 1 },
        styles.iconContainer,
      ]}
      onPress={() => router.navigate("/settings")}
    >
      <Ionicons name="ellipsis-vertical" style={styles.settingsIcon} />
    </Pressable>
  );
};

export default OpenSettingsButton;

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    backgroundColor: colors.border,
    justifyContent: "center", // horizontal position
    alignItems: "center", // Vertical position
  },

  settingsIcon: {
    fontSize: 30,
    color: colors.text,
  },
});
