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

interface IProps {
  setItemsViewVisible: (visible: boolean) => void;
  setUpdateModalVisible: (visible: boolean) => void;
  updateModalVisible: boolean;
  setActiveList: (mainListTitle: string) => void; // Prop to set thea active Main List Title
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
  const refreshData = () => {
    setMainLists(mainListsContainer.getMainLists());
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
      <Pressable onPress={handleMainListPress(item)}>
        <Text
          style={[
            styles.mainListText,
            {
              backgroundColor: item.isActive
                ? colors.primary
                : colors.borderLight,
            },
          ]}
        >
          {item.title}
        </Text>
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
    mainListsContainer.handleDeleteList(mainList, setActiveList);
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
    //flex: 1,
    height: "auto",
    maxHeight: "100%",
  },
  mainListText: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 22,
    backgroundColor: colors.borderLight,
    width: "100%",
    borderRadius: 5,
  },
});

export default MainListsView;
