import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "@/assets/colors";
import { Switch } from "react-native-gesture-handler";

const AddingBehavior = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Close after adding</Text>
      <Switch
        trackColor={{ false: "#767577", true: colors.text }}
        thumbColor={isEnabled ? colors.primaryLight : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center", // Vertical position
  },
  label: { color: colors.textSecondary, fontSize: 18, paddingRight: 5 },
});

export default AddingBehavior;
