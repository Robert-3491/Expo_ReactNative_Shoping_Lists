import { View, Text, StyleSheet } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import "react-native-gesture-handler";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as MainListsContainer from "@/containers/mainListsContainer";
import * as dbRepoList from "@/data/db/dbRepoList";
import { MainList } from "@/data/models/mainList";
import AddMainList from "./addMainList";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  setModalVisible: (visible: boolean) => void;
  setActiveList: (mainListTitle: string) => void; // Prop to set thea active Main List Title
}

export default forwardRef<{ exitEdit: () => void }, IProps>(
  function MainListsModalContents({ setModalVisible, setActiveList }, ref) {
    // State to hold the Main Lists
    const [mainLists, setMainLists] = useState<MainList[]>(
      MainListsContainer.getMainLists()
    );
    // State to manage the editing mode of the Main Lists - blocks selection of lists on edit
    const [isMainListEditing, setIsMainListEditing] = useState(false);

    // State to manage the text input for editing main list titles
    const [editText, setEditText] = useState("");

    // Ref to hold the SwipeableFlatList instance for closing the open rows on edit
    const swipeListRef = useRef<any>(null);

    const exitEdit = () => {
      setIsMainListEditing(false);
      const updatedLists = mainLists.map((list) => ({
        ...list,
        isEditing: false,
      }));
      setMainLists(updatedLists);
    };

    // Expose exitEdit to parent
    useImperativeHandle(ref, () => ({
      exitEdit,
    }));

    // Function to handle reloading the Main Lists
    const handleReloadMainList = () => {
      setMainLists(MainListsContainer.getMainLists()); // Reload the Main Lists
      setModalVisible(false); // Close the modal after reloading
    };

    //Change the active list when a main list is pressed
    const handleMainListPress = (item: MainList) => () => {
      if (isMainListEditing) {
        return;
      }
      if (item.isActive) {
        setModalVisible(false);
      }
      MainListsContainer.SetInactiveLists(); // Set all lists to inactive
      dbRepoList.setAllInactive(); // Ensure the database reflects this change
      item.isActive = true; // Set the pressed list as active
      dbRepoList.setActiveMainList(item.id); // Update the database to set this list as active
      setActiveList(item.title); // Set the active list title
      setModalVisible(false); // Close the modal after selecting a list
    };

    // To be used by text input onBlur and subbmit event
    const handleSaveEdit = (item: MainList) => {
      const editTextUpped = MainListsContainer.capitalizeFirst(editText);

      item.isEditing = false; // Exit editing mode for the item
      setIsMainListEditing(false); // Exit editing mode for the main list

      if (item.title != editTextUpped) {
        item.title = editTextUpped; // Update the item's title with the edited text
        dbRepoList.updateMainList(item.id, item); // Update the main list in the database
        MainListsContainer.updateMainList(item.id, item); // Update the main list in the local state

        if (item.isActive) {
          setActiveList(editTextUpped); // Update the active list title if ACTIVE
        }
      }
    };

    // Render function for each main list item
    const renderMainList = ({ item }: { item: MainList }) => {
      return (
        <Pressable onPress={handleMainListPress(item)}>
          {item.isEditing ? (
            // TextInput mounts fresh when editing starts
            <TextInput
              autoCorrect={false}
              selectionColor={colors.edit}
              autoFocus={true}
              value={editText}
              onFocus={() => {
                setEditText(item.title); // Set the text input value to the current title when focused
              }}
              onChangeText={(text) => setEditText(text)}
              onBlur={() => handleSaveEdit(item)}
              onSubmitEditing={() => handleSaveEdit(item)}
              style={[
                styles.itemText,
                styles.itemEdit,
                {
                  backgroundColor: item.isActive
                    ? colors.primaryLight
                    : colors.borderLight,
                },
              ]}
            />
          ) : (
            // Regular text when not editing
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
          )}
        </Pressable>
      );
    };

    const handleEditPress = (item: MainList) => {
      setIsMainListEditing(true);
      setMainLists((currentLists) =>
        currentLists.map((list) =>
          list.id === item.id ? { ...list, isEditing: true } : list
        )
      );
      swipeListRef.current?.closeAnyOpenRows();
    };

    // RENDER LEFT ACTIONS
    const renderLeftActions = (item: MainList) => {
      if (isMainListEditing) {
        return; // Do not render left action if in editing mode
      }
      return (
        <View style={styles.leftActionContainer}>
          <Pressable onPress={() => handleEditPress(item)}>
            <View style={styles.actionBase}>
              <Ionicons name="pencil" size={27} color={colors.text} />
            </View>
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>
      );
    };

    // Function to handle deleting a main list - for RIGHT ACTION
    function handleDeleteList(item: MainList): void {
      dbRepoList.deleteMainList(item.id); // Remove from database
      MainListsContainer.deleteMainList(item.id); // Remove from local state
      const updatedLists = MainListsContainer.getMainLists(); // Get updated lists from local state
      setMainLists(updatedLists); // Refresh local state with updated lists from database - state available on next render

      if (item.isActive) {
        if (updatedLists.length > 0) {
          updatedLists[0].isActive = true; // Set the first list as active if available
          setActiveList(updatedLists[0].title); // Update the active list title
          dbRepoList.setActiveMainList(updatedLists[0].id); // Update the database with the new active list
        } else {
          setActiveList("No list created yet"); // Set a default message if no lists are left
        } // Clear active list if no lists are left
      }
    }

    // RENDER RIGHT ACTIONS
    const renderRightActions = (item: MainList) => {
      if (isMainListEditing) {
        return; // Do not render right action if in editing mode
      }
      return (
        <View style={styles.rightActionContainer}>
          <View style={{ flex: 1 }} />
          <Pressable onPress={() => handleDeleteList(item)}>
            <View style={styles.actionBase}>
              <Ionicons name="trash" size={30} color={colors.text} />
            </View>
          </Pressable>
        </View>
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
          ref={swipeListRef}
          data={mainLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMainList}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  }
);

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
    width: "100%",
    borderRadius: 5,
  },
  itemEdit: {
    borderWidth: 1.5,
    borderColor: colors.edit,
  },

  leftActionContainer: {
    flexDirection: "row",
    width: "100%",
    //backgroundColor: colors.edit, // Set background color for the entire container
    backgroundColor: colors.edit, // Set background color for the entire container
    marginRight: "-82%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightActionContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.delete, // Set background color for the entire container
    marginLeft: "-82%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  // Base style for both left and right actions
  actionBase: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
  },
});
