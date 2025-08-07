import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HeaderSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>App Settings</Text>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.4 : 1 },
          styles.iconWrapper,
        ]}
        onPress={() => router.back()}
      >
        <Ionicons style={styles.returnIcon} name="arrow-back-circle" />
      </Pressable>
    </View>
  );
};

export default HeaderSettings;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
    color: colors.text,
    paddingVertical: 15,
    flex: 1,
  },
  iconWrapper: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  returnIcon: {
    fontSize: 45,
    color: colors.text,
  },
});
