import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Props {
  children: React.ReactNode;
  showHome?: boolean;
}

const Header = ({ children, showHome }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{children}</Text>

      {showHome && (
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.4 : 1 },
            styles.iconWrapper,
          ]}
          onPress={() => {
            router.back();
            router.back();
          }}
        >
          <Ionicons style={styles.homeIcon} name="home" />
        </Pressable>
      )}

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

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.card,
    paddingLeft: 15,
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
  homeIcon: {
    fontSize: 38,
    color: colors.text,
  },
});
