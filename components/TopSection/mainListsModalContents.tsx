import { View, Text, StyleSheet } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as MainListsContainer from "@/containers/mainListsContainer";
import { MainList } from "@/data/models/mainList";
import AddMainList from "./addMainList";
import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import RenderDeleteItem from "../SharedComponents/renderDeleteItem";
import RenderEditItem from "../SharedComponents/renderEditItem";

interface IProps {
  setModalVisible: (visible: boolean) => void;
  setActiveList: (mainListTitle: string) => void; // Prop to set thea active Main List Title
}

export default forwardRef<{ exitEdit: () => void }, IProps>(
  function MainListsModalContents({ setModalVisible, setActiveList }, ref) {
    //
    useEffect(() => {
      const initializeData = async () => {
        await MainListsContainer.initializeMainLists();
        setMainLists(MainListsContainer.getMainLists());
      };
      initializeData();
    }, []);

    //
    // State to hold the Main Lists
    const [mainLists, setMainLists] = useState<MainList[]>([]);

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
      MainListsContainer.handleMainListPress(item);
      setActiveList(item.title); // Set the active list title
      setModalVisible(false); // Close the modal after selecting a list
    };

    const handleSaveEdit = (item: MainList) => {
      setIsMainListEditing(false); // Exit editing mode for the main list
      const newTitle = MainListsContainer.handleSaveEdit(item, editText);

      if (item.isActive && item.title !== newTitle) {
        setActiveList(newTitle); // Update the active list title if ACTIVE
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
      return <RenderEditItem item={item} handleEdit={handleEditPress} />;
    };

    // Function to handle deleting a main list - for RIGHT ACTION
    function handleDeleteList(item: MainList): void {
      setMainLists(MainListsContainer.getMainLists); // Refresh local state with updated lists from database - state available on next render
      const response = MainListsContainer.handleDeleteList(item);
      if (response !== undefined) {
        setActiveList(response);
      }
      setMainLists(MainListsContainer.getMainLists());
    }

    // RENDER RIGHT ACTIONS
    const renderRightActions = (item: MainList) => {
      if (isMainListEditing) {
        return; // Do not render right action if in editing mode
      }
      return <RenderDeleteItem item={item} handleDelete={handleDeleteList} />;
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
});
