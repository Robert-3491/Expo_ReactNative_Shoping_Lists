import { ColorValue, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";

interface Props {
  children: React.ReactNode;
  margin?: TextStyle;
  color?: ColorValue;
  fontSize?: number;
}

const TextDefault = ({
  children,
  margin,
  color = colors.text,
  fontSize = 18,
}: Props) => {
  return (
    <View>
      <Text style={[margin, { color: color }, { fontSize: fontSize }]}>
        {children}
      </Text>
    </View>
  );
};

export default TextDefault;
