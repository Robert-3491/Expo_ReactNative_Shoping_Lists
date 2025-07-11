import { View, StyleSheet, Button } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { colors } from "@/assets/colors";
import { useEffect, useState } from "react";
import { SectionList } from "@/data/models/sectionList";
import DropdownPressable from "@/components/SharedComponents/dropDownPressable";
import * as sectionListsContainer from "@/containers/sectionListsContainer";
import RenderEditItem from "@/components/SharedComponents/renderEditItem";
import RenderDeleteItem from "@/components/SharedComponents/renderDeleteItem";
import ItemsView from "../ItemLists/itemsView";

export default function SectionsLists() {
  const [data, setData] = useState<SectionList[]>([]);

  // Function to refresh the data
  const refreshData = () => {
    setData(sectionListsContainer.getSectionLists());
  };

  useEffect(() => {
    const initializeData = async () => {
      await sectionListsContainer.initializeSectionLists();
      refreshData();
    };
    // Set up the callback for when data changes
    sectionListsContainer.setOnDataChangeCallback(refreshData);
    initializeData();
    // Cleanup callback on unmount
    return () => {
      sectionListsContainer.setOnDataChangeCallback(() => {});
    };
  }, []);

  const toggleItemVisibility = (id: number) => {
    sectionListsContainer.toggleItemVisibility(id);
    refreshData();
  };

  // Render individual list sectionLists
  const renderItem = ({ item }: { item: SectionList }) => {
    return (
      <View>
        <View style={styles.dropdownPressable}>
          <DropdownPressable
            text={item.title}
            isOpen={item.isVisible}
            onPress={() => toggleItemVisibility(item.id)}
            textStyle={{ fontSize: 22 }}
            style={{ paddingVertical: 11 }}
          />
        </View>
        {item.isVisible ? <ItemsView sectionId={item.id} /> : null}
      </View>
    );
  };

  // Render left swipe actions for each sectionList
  const renderLeftActions = (item: SectionList) => {
    return (
      <RenderEditItem item={item} handleEdit={() => console.log("Edit")} />
    );
  };

  const deleteSectionList = (item: SectionList) => {
    sectionListsContainer.deleteList(item.id);
    refreshData();
  };

  // Render right swipe actions for each sectionList
  const renderRightActions = (item: SectionList) => {
    return <RenderDeleteItem item={item} handleDelete={deleteSectionList} />;
  };

  const addDummySections = async () => {
    await sectionListsContainer.addDummySections();
    refreshData();
  };

  return (
    <View style={styles.container}>
      <SwipeableFlatList
        data={data}
        keyExtractor={(item: SectionList) => item.id.toString()}
        renderItem={renderItem}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
      <Button title="Add section" onPress={addDummySections} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    backgroundColor: colors.background,
    flex: 1,
  },
  dropdownPressable: {
    backgroundColor: colors.surface,
    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 2,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 80,
  },
});
