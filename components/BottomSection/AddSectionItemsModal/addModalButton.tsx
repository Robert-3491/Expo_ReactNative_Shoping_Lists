import { StyleSheet, Text, View, Pressable, ColorValue } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  buttonText: string;
  onPress: () => void;
  backgroundColor: ColorValue;
}

const AddModalButton: React.FC<Props> = ({
  buttonText,
  onPress,
  backgroundColor,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.buttonStyle,
          { backgroundColor: backgroundColor },
          { opacity: pressed ? 0.4 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: "100%",
  },
  buttonStyle: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { fontSize: 20, color: colors.text, textAlign: "center" },
});

export default AddModalButton;
