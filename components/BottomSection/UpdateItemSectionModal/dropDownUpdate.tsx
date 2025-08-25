import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TextDefault from "../../SharedComponents/textDefault";
import { colors } from "@/assets/colors";
import { Item } from "@/data/models/item";
import { SectionList } from "@/data/models/sectionList";
import { MainList } from "@/data/models/mainList";
import { getSectionLists } from "@/containers/sectionListsContainer";
import { getMainLists } from "@/containers/mainListsContainer";

interface Props {
  setRelationId: (id: number) => void;
  item?: Item;
  sectionList?: SectionList;
}

const DropDownUpdate = ({ setRelationId, item, sectionList }: Props) => {
  const [data, setData] = useState<MainList[] | SectionList[]>([]);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (item) {
      const sectionLists = getSectionLists();
      setData(sectionLists);
      const initialSectionList = sectionLists.find(
        (element) => element.id === item.sectionListId
      );
      if (initialSectionList) {
        setValue(initialSectionList.id);
      }
    }
    const setMainlists = async () => {
      const mainLists = await getMainLists();
      setData(mainLists);
      if (sectionList) {
        const initialMainList = mainLists.find(
          (element) => element.id === sectionList.mainListId
        );
        if (initialMainList) {
          setValue(initialMainList.id);
        }
      }
    };
    if (sectionList) {
      setMainlists();
    }
  }, [item, sectionList]);

  const renderItem = (item: MainList | SectionList) => {
    return (
      <View>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.title}</Text>
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
      labelField="title"
      valueField="id"
      placeholder="Select"
      value={value}
      onChange={(selectedItem: MainList | SectionList) => {
        setValue(selectedItem.id);
        setRelationId(selectedItem.id);
      }}
      renderLeftIcon={() => (
        <TextDefault>{item ? "Section: " : "List: "}</TextDefault>
      )}
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
