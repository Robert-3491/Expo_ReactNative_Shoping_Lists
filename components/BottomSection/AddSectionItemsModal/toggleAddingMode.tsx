import { colors } from "@/assets/colors";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  addingMode: string;
  setAddingMode: (value: string) => void;
}

const ToggleAddingMode: React.FC<Props> = ({ addingMode, setAddingMode }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.pressable,
          addingMode === "ITEM" && styles.avtiveBackground,
        ]}
        onPress={() => setAddingMode("ITEM")}
      >
        <Text style={styles.label}>Add Item</Text>
      </Pressable>
      <Pressable
        style={[
          styles.pressable,
          addingMode === "SECTION" && styles.avtiveBackground,
        ]}
        onPress={() => setAddingMode("SECTION")}
      >
        <Text style={styles.label}>Add Section</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    paddingBottom: 10,
  },
  pressable: { width: "50%", borderRadius: 5, paddingVertical: 8 },
  label: {
    fontSize: 20,
    textAlign: "center",
    color: colors.text,
  },
  avtiveBackground: {
    backgroundColor: colors.primary,
  },
});

export default ToggleAddingMode;

//onPress={() => setToggleValue(!toggleValue)}
