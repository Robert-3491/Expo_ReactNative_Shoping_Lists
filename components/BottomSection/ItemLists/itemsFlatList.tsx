import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Item } from "@/data/models/item";
import * as itemsContainer from "@/containers/itemsContainer";
import RenderItem from "./renderItem";
import RenderEditItem from "@/components/SharedComponents/renderEditItem";
import RenderDeleteItem from "@/components/SharedComponents/renderDeleteItem";
import UpdateItemSectionModal from "../UpdateItemSectionModal/updateItemSectionModal";
import EmptyItemListComponent from "./emptyItemListComponent";

interface Props {
  sectionId: number;
}

const ItemsFlatList: React.FC<Props> = ({ sectionId }) => {
  // component start

  const [data, setData] = useState<Item[]>([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [itemForUpdate, setItemForUpdate] = useState<Item>();

  const refreshData = () => {
    setData(itemsContainer.getItems(sectionId));
  };

  useEffect(() => {
    // Set up the callback
    itemsContainer.setOnRefreshItemsCallback(sectionId, refreshData);
    refreshData();

    // Cleanup callback on unmount
    return () => {
      itemsContainer.setOnRefreshItemsCallback(sectionId, () => {});
    };
  }, [sectionId]);

  const toggleIsChecked = (id: number) => {
    itemsContainer.toggleIsChecked(id, sectionId);
    refreshData();
  };

  const renderItem = ({ item }: { item: Item }) => {
    // Render individual list items
    return <RenderItem item={item} toggleIsChecked={toggleIsChecked} />;
  };

  // Open UpdateModal for Edit action on selected SectionList
  const openUpdateModalItem = (item: Item) => {
    setItemForUpdate(item);
    setUpdateModalVisible(!updateModalVisible);
  };

  const renderLeftActions = (item: Item) => {
    // Render left swipe actions for each item
    return (
      <RenderEditItem
        item={item}
        handleEdit={() => openUpdateModalItem(item)}
      />
    );
  };

  const renderRightActions = (item: Item) => {
    // Render right swipe actions for each item
    return (
      <RenderDeleteItem
        item={item}
        handleDelete={() => itemsContainer.deleteList(item.id, refreshData)}
      />
    );
  };

  return (
    <View style={styles.itemContainer}>
      <SwipeableFlatList
        keyboardShouldPersistTaps="handled"
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        removeClippedSubviews={false}
        scrollEnabled={false}
        ListEmptyComponent={<EmptyItemListComponent />}
      />
      <UpdateItemSectionModal
        updateModalVisible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
        item={itemForUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "97%",
    alignSelf: "center",
  },
});

export default ItemsFlatList;
