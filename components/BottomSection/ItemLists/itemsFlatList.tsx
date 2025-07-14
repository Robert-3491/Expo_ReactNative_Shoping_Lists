import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/assets/colors";
import { useEffect, useState } from "react";
import { Item } from "@/data/models/item";
import * as itemsContainer from "@/containers/itemsContainer";

interface Props {
  sectionId: number;
}

const ItemsFlatList: React.FC<Props> = ({ sectionId }) => {
  // component start

  const [data, setData] = useState<Item[]>([]);

  const refreshData = () => {
    setData(itemsContainer.getItems(sectionId));
  };

  useEffect(() => {
    const initializeData = async () => {
      await itemsContainer.initializeItemLists();
      refreshData();
    };
    // Set up the callback for when data changes
    itemsContainer.setOnRefreshItemsCallback(refreshData);
    initializeData();
    // Cleanup callback on unmount
    return () => {
      itemsContainer.setOnRefreshItemsCallback(() => {});
    };
  }, []);

  const renderItem = ({ item }: { item: Item }) => {
    // Render individual list items
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const renderLeftActions = (item: Item) => {
    // Render left swipe actions for each item
    return <Text>LEFT</Text>;
  };

  const renderRightActions = (item: Item) => {
    // Render right swipe actions for each item
    return <Text>DELTE</Text>;
  };

  return (
    <SwipeableFlatList
      keyboardShouldPersistTaps="handled"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    backgroundColor: colors.border,
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default ItemsFlatList;
