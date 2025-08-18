import { StyleSheet, Text, View, Pressable, ColorValue } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  buttonText: string;
  onPress: () => void;
  onLongPress?: () => void;
  backgroundColor: ColorValue;
  fontSize?: number;
}

const CustomButton: React.FC<Props> = ({
  buttonText,
  onPress,
  onLongPress,
  backgroundColor,
  fontSize = 20,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.buttonStyle,
          { backgroundColor: backgroundColor },
          { opacity: pressed ? 0.4 : 1 },
        ]}
      >
        <Text style={[styles.buttonText, { fontSize: fontSize }]}>
          {buttonText}
        </Text>
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
  buttonText: { color: colors.text, textAlign: "center" },
});

export default CustomButton;
