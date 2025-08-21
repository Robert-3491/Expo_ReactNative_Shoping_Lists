import { View, Text, StyleSheet } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { Pressable } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as mainListsContainer from "@/containers/mainListsContainer";
import { MainList } from "@/data/models/mainList";
import AddMainList from "./addMainList";
import { useState, useRef, useEffect } from "react";
import RenderDeleteItem from "../SharedComponents/renderDeleteItem";
import RenderEditItem from "../SharedComponents/renderEditItem";
import { copyToClipboard } from "@/Utilities/clipboardHandler";
import ContentCount from "../SharedComponents/contentCount";
import { getActiveMainList } from "@/containers/mainListsContainer";

interface IProps {
  setItemsViewVisible: (visible: boolean) => void;
  setUpdateModalVisible: (visible: boolean) => void;
  updateModalVisible: boolean;
  setActiveList: (mainListTitle: MainList | undefined) => void; // Prop to set thea active Main List Title
  setUpdatingMainList: (val: MainList) => void; // Prop to set thea active Main List Title
}

const MainListsView: React.FC<IProps> = ({
  setItemsViewVisible,
  setUpdateModalVisible,
  updateModalVisible,
  setActiveList,
  setUpdatingMainList,
}) => {
  const [mainLists, setMainLists] = useState<MainList[]>([]);

  // Function to refresh the data
  const refreshData = async () => {
    setMainLists(await mainListsContainer.getMainLists());
    setActiveList(await getActiveMainList());
  };

  useEffect(() => {
    // Set up the callback for when data changes
    mainListsContainer.setOnRefreshCallback(refreshData);
    refreshData();
    // Cleanup callback on unmount
    return () => {
      mainListsContainer.setOnRefreshCallback(() => {});
    };
  }, []);

  //

  // Ref to hold the SwipeableFlatList instance for closing the open rows on edit
  const swipeListRef = useRef<any>(null);

  // Function to handle reloading the Main Lists
  const handleReloadMainList = () => {
    refreshData(); // Reload the Main Lists
    setItemsViewVisible(false); // Close the modal after reloading
  };

  //Change the active list when a main list is pressed
  const handleMainListPress = (mainList: MainList) => () => {
    mainListsContainer.handleMainListPress(
      mainList,
      setItemsViewVisible,
      setActiveList
    );
    refreshData();
  };

  // Render function for each main list mainList
  const renderMainList = ({ item }: { item: MainList }) => {
    return (
      <Pressable
        onPress={handleMainListPress(item)}
        onLongPress={() => copyToClipboard({ mainList: item })}
        style={({ pressed }) => [
          { opacity: pressed ? 0.4 : 1 },
          {
            backgroundColor: item.isActive
              ? colors.primary
              : colors.borderLight,
          },
          styles.pressable,
        ]}
      >
        <Text style={[styles.mainListText]}>{item.title}</Text>
        <ContentCount mainList={item} />
      </Pressable>
    );
  };

  const handleEditPress = (mainList: MainList) => {
    setUpdatingMainList(mainList);
    setUpdateModalVisible(!updateModalVisible);
    swipeListRef.current?.closeAnyOpenRows();
  };

  // RENDER LEFT ACTIONS
  const renderLeftActions = (mainList: MainList) => {
    return <RenderEditItem item={mainList} handleEdit={handleEditPress} />;
  };

  // Function to handle deleting a main list - for RIGHT ACTION
  function handleDeleteList(mainList: MainList): void {
    mainListsContainer.handleDeleteList(mainList, (val: MainList | undefined) =>
      setActiveList(val)
    );
    refreshData();
  }

  // RENDER RIGHT ACTIONS
  const renderRightActions = (mainList: MainList) => {
    return <RenderDeleteItem item={mainList} handleDelete={handleDeleteList} />;
  };

  return (
    <View style={styles.container}>
      <AddMainList
        reloadMainList={handleReloadMainList}
        setActiveList={setActiveList}
      />
      {/* Swipeable FlatList for main lists */}
      <SwipeableFlatList
        ref={swipeListRef}
        data={mainLists}
        keyExtractor={(mainList) => mainList.id.toString()}
        renderItem={renderMainList}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    maxHeight: "100%",
  },
  pressable: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 8,
    width: "100%",
    borderRadius: 5,
  },

  mainListText: {
    color: colors.text,
    fontSize: 22,
    width: "100%",
  },
});

export default MainListsView;
