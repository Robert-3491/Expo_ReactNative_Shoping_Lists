import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { Pressable } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as mainListsContainer from "@/containers/mainListsContainer";
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
import EditMainListTextInput from "./editMainListTextInput";

interface IProps {
  setModalVisible: (visible: boolean) => void;
  setActiveList: (mainListTitle: string) => void; // Prop to set thea active Main List Title
}

export default forwardRef<{ exitEdit: () => void }, IProps>(
  function MainListsModalContents({ setModalVisible, setActiveList }, ref) {
    // State to hold the Main Lists
    const [mainLists, setMainLists] = useState<MainList[]>([]);

    // Function to refresh the data
    const refreshData = () => {
      setMainLists(mainListsContainer.getMainLists());
    };

    useEffect(() => {
      refreshData();
    }, []);

    //

    // State to manage the editing mode of the Main Lists - blocks selection of lists on edit
    const [isMainListEditing, setIsMainListEditing] = useState(false);

    // State to manage the text input for editing main list titles
    const [editText, setEditText] = useState("");

    // Ref to hold the SwipeableFlatList instance for closing the open rows on edit
    const swipeListRef = useRef<any>(null);

    const exitEdit = () => {
      setIsMainListEditing(false);
      mainListsContainer.mainListsStopEdit();
    };
    // Expose exitEdit
    useImperativeHandle(ref, () => ({
      exitEdit,
    }));

    // Function to handle reloading the Main Lists
    const handleReloadMainList = () => {
      refreshData(); // Reload the Main Lists
      setModalVisible(false); // Close the modal after reloading
    };

    //Change the active list when a main list is pressed
    const handleMainListPress = (mainList: MainList) => () => {
      mainListsContainer.handleMainListPress(
        mainList,
        isMainListEditing,
        setModalVisible,
        setActiveList
      );
      refreshData();
    };

    const handleSaveEdit = (mainList: MainList) => {
      mainListsContainer.handleSaveEdit(
        mainList,
        editText,
        setIsMainListEditing,
        setActiveList
      );
      refreshData();
    };

    // Render function for each main list mainList
    const renderMainList = ({ item }: { item: MainList }) => {
      return (
        <Pressable onPress={handleMainListPress(item)}>
          {item.isEditing ? (
            // TextInput mounts fresh when editing starts

            <EditMainListTextInput
              mainList={item}
              editText={editText}
              setEditText={setEditText}
              handleSaveEdit={handleSaveEdit}
            />
          ) : (
            // Regular text when not editing
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
          )}
        </Pressable>
      );
    };

    const handleEditPress = (mainList: MainList) => {
      mainListsContainer.handleEditPress(mainList, setIsMainListEditing);
      swipeListRef.current?.closeAnyOpenRows();
      refreshData();
    };

    // RENDER LEFT ACTIONS
    const renderLeftActions = (mainList: MainList) => {
      if (isMainListEditing) {
        return; // Do not render left action if in editing mode
      }
      return <RenderEditItem item={mainList} handleEdit={handleEditPress} />;
    };

    // Function to handle deleting a main list - for RIGHT ACTION
    function handleDeleteList(mainList: MainList): void {
      mainListsContainer.handleDeleteList(mainList, setActiveList);
      refreshData();
    }

    // RENDER RIGHT ACTIONS
    const renderRightActions = (mainList: MainList) => {
      if (isMainListEditing) {
        return; // Do not render right action if in editing mode
      }
      return (
        <RenderDeleteItem item={mainList} handleDelete={handleDeleteList} />
      );
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
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        />
      </View>
    );
  }
);

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
    fontSize: 25,
    backgroundColor: colors.borderLight,
    width: "100%",
    borderRadius: 5,
  },
});
