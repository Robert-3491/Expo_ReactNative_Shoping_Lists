import { View, Text, StyleSheet } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import "react-native-gesture-handler";
import { Pressable } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as MainListsContainer from "@/containers/mainListsContainer";
import * as dbRepo from "@/data/db/dbRepo";
import { MainList } from "@/data/models/mainList";
import AddMainList from "./addMainList";
import { useState } from "react";

interface IProps {
  setModalVisible: (visible: boolean) => void;
  setActiveList: (mainListTitle: string) => void; // Prop to set thea active Main List Title
}

export default function MainListsModalContents({
  setModalVisible,
  setActiveList,
}: IProps) {
  // State to hold the Main Lists
  const [mainLists, setMainLists] = useState<MainList[]>(
    MainListsContainer.getMainLists()
  );

  // Function to handle reloading the Main Lists
  const handleReloadMainList = () => {
    setMainLists(MainListsContainer.getMainLists()); // Reload the Main Lists
    setModalVisible(false); // Close the modal after reloading
  };

  const handleMainListPress = (item: MainList) => () => {
    MainListsContainer.SetInactiveLists(); // Set all lists to inactive
    dbRepo.setAllInactive(); // Ensure the database reflects this change
    item.isActive = true; // Set the pressed list as active
    dbRepo.setActiveMainList(item.id); // Update the database to set this list as active
    setActiveList(item.title); // Set the active list title
    setModalVisible(false); // Close the modal after selecting a list
  };

  // Render function for each main list item
  const renderMainList = ({ item }: { item: MainList }) => {
    return (
      <Pressable onPress={handleMainListPress(item)}>
        <Text
          style={[
            styles.itemText,
            {
              backgroundColor: item.isActive
                ? colors.primaryLight
                : colors.borderLight,
            },
          ]}
        >
          {item.title}
        </Text>
      </Pressable>
    );
  };

  const renderLeftActions = (item: MainList) => {
    return (
      <View style={styles.leftAction}>
        <Text>Edit</Text>
      </View>
    );
  };

  const renderRightActions = (item: MainList) => {
    return (
      <Pressable onPress={() => dbRepo.deleteMainList(item.id)}>
        <View style={styles.rightAction}>
          <Text>Delete</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Fixed element for adding a new list */}
      <AddMainList
        reloadMainList={handleReloadMainList}
        setActiveList={setActiveList}
      />
      {/* Swipeable FlatList for main lists */}
      <SwipeableFlatList
        data={mainLists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMainList}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemText: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 18,
    backgroundColor: colors.borderLight,
    marginVertical: 5,
    width: "100%",
    borderRadius: 5,
  },
  leftAction: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  rightAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
});
