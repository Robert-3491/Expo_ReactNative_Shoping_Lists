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
import UpdateItemSectionModal from "../UpdateItemSectionModal/updateItemSectionModal";

export default function SectionsLists() {
  const [data, setData] = useState<SectionList[]>([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [sectionForUpdate, setSectionForUpdate] = useState<SectionList>();

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
    sectionListsContainer.setOnRefreshSectionsCallback(refreshData);
    initializeData();
    // Cleanup callback on unmount
    return () => {
      sectionListsContainer.setOnRefreshSectionsCallback(() => {});
    };
  }, []);

  const toggleItemVisibility = (id: number) => {
    sectionListsContainer.toggleItemVisibility(id);
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
            style={{ paddingVertical: 10 }}
            sectionList={item}
          />
        </View>
        {item.isVisible ? <ItemsView sectionId={item.id} /> : null}
      </View>
    );
  };

  // Open UpdateModal for Edit action on selected SectionList
  const openUpdateModalSection = (sectionList: SectionList) => {
    setSectionForUpdate(sectionList);
    setUpdateModalVisible(!updateModalVisible);
  };

  // Render left swipe actions for each sectionList
  const renderLeftActions = (item: SectionList) => {
    return (
      <RenderEditItem
        item={item}
        handleEdit={() => openUpdateModalSection(item)}
      />
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

  return (
    <View style={styles.container}>
      <SwipeableFlatList
        keyboardShouldPersistTaps="handled"
        data={data}
        keyExtractor={(item: SectionList) => item.id.toString()}
        renderItem={renderItem}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        removeClippedSubviews={false}
      />
      <Button
        title="sec"
        onPress={() => sectionListsContainer.addSection("test")}
      ></Button>
      <UpdateItemSectionModal
        updateModalVisible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
        sectionList={sectionForUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: "1.5%",
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
