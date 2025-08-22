import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import TextDefault from "./textDefault";
import { colors } from "@/assets/colors";

// Define the type for dropdown items
interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropDownUpdate = () => {
  const [value, setValue] = useState<string | null>(null);

  const renderItem = (item: DropdownItem) => {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <Dropdown
      search={false}
      activeColor={colors.primary}
      style={styles.dropdown}
      containerStyle={styles.containerStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item: DropdownItem) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => <TextDefault>Section: </TextDefault>}
      renderItem={renderItem}
    />
  );
};

export default DropDownUpdate;

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  containerStyle: {
    backgroundColor: colors.itemBackground,
    borderRadius: 5,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: colors.textSecondary,
  },
  item: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  textItem: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
  },
  placeholderStyle: {
    fontSize: 18,
    color: colors.text,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
});
