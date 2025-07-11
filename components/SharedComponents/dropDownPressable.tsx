import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";
import { SectionList } from "@/data/models/sectionList";
import AddButton from "../BottomSection/SectionLists/addButton";

interface Props {
  text: string;
  isOpen: boolean;
  onPress: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
  sectionList?: SectionList;
}

const DropdownPressable: React.FC<Props> = ({
  text,
  isOpen,
  onPress,
  onLayout,
  style,
  textStyle,
  iconStyle,
  sectionList,
}) => (
  <View style={styles.container}>
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={({ pressed }) => [
        styles.pressSection,
        style,
        { opacity: pressed ? 0.4 : 1 },
      ]}
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
    {sectionList ? <AddButton sectionList={sectionList} /> : null}
  </View>
);

// Stock styles
const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  pressSection: {
    flexDirection: "row",
    flex: 1,
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
