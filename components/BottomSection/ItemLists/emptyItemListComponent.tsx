import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";

const EmptyItemListComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your list is empty. Tap{" "}
        <Text style={[styles.text, styles.plus]}>+</Text> to add items &
        sections
      </Text>
    </View>
  );
};

export default EmptyItemListComponent;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  text: { color: colors.textSecondary, fontSize: 18 },
  plus: { color: colors.primaryLight, fontSize: 20, fontWeight: "bold" },
});
