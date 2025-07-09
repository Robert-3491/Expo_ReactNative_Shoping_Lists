import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";

interface Props {
  text: string;
  isOpen: boolean;
  onPress: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
}

const DropdownPressable: React.FC<Props> = ({
  text,
  isOpen,
  onPress,
  onLayout,
  style,
  textStyle,
  iconStyle,
}) => (
  <Pressable
    onPress={onPress}
    onLayout={onLayout}
    style={[styles.pressSection, style]}
  >
    <Ionicons
      name={isOpen ? "caret-up-outline" : "caret-down-outline"}
      style={[styles.dropdownIcon, styles.pressSectionElements, iconStyle]}
    />
    <Text
      style={[styles.activeListsText, styles.pressSectionElements, textStyle]}
    >
      {text}
    </Text>
  </Pressable>
);

// Stock styles
const styles = StyleSheet.create({
  pressSection: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: 15,
  },
  pressSectionElements: {
    fontSize: 25,
    color: colors.text,
  },
  dropdownIcon: {
    marginHorizontal: 5,
    verticalAlign: "middle",
  },
  activeListsText: {
    color: colors.text,
  },
});

export default DropdownPressable;
