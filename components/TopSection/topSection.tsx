import { View, StyleSheet, Dimensions, Keyboard } from "react-native";
import { colors } from "../../assets/colors";
import { useState, useEffect } from "react";
import MainListsView from "./mainListsView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as dbRepoList from "@/data/db/dbRepoList";
import DropdownPressable from "../SharedComponents/dropDownPressable";
import BottomSection from "../BottomSection/SectionLists/bottomSection";
import UpdateAllListsModal from "../BottomSection/UpdateItemSectionModal/updateItemSectionModal";
import * as mainListsContainer from "@/containers/mainListsContainer";
import { MainList } from "@/data/models/mainList";

const { height: windowHeight } = Dimensions.get("window");

export default function TopSection() {
  const [activeList, setActiveList] = useState("Loading...");
  const [updatingMainList, setUpdatingMainList] = useState<MainList>();

  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [dropdownHeight, setDropdownHeight] = useState(0);

  // Load active list on component mount
  useEffect(() => {
    const loadActiveList = async () => {
      const activeMainList = await dbRepoList.getActiveMainList();
      if (activeMainList) {
        setActiveList(activeMainList.title);
      } else {
        setActiveList("No list created yet");
      }
    };

    loadActiveList();
  }, []);

  // Exit edit mode before closing modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    Keyboard.dismiss();
  };

  // Handle layout to get dropdown height
  const handleDropdownLayout = (event: any) => {
    const borderHeight = 4; //border is not included in the event.nativeEvent.layout
    const { height } = event.nativeEvent.layout;
    setDropdownHeight(height + borderHeight);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dropdownPressable}>
        {/* Pressable section that toggles the modal */}
        <DropdownPressable
          text={activeList}
          isOpen={modalVisible}
          onPress={toggleModal}
          onLayout={handleDropdownLayout}
          mainList={mainListsContainer.getActiveMainList()}
        />
      </View>

      {/* The modal content */}

      <View
        style={[
          styles.mainListsView,
          {
            display: modalVisible ? "flex" : "none",
            height: windowHeight - dropdownHeight,
            marginTop: dropdownHeight,
          },
        ]}
      >
        {/* GestureHandlerRootView is used to handle gestures in the modal - required HERE*/}
        <GestureHandlerRootView>
          {/* MainListsModalContents => the component that renders the lists */}
          <MainListsView
            setItemsViewVisible={toggleModal}
            setActiveList={setActiveList}
            setUpdateModalVisible={setUpdateModalVisible}
            updateModalVisible={updateModalVisible}
            setUpdatingMainList={setUpdatingMainList}
          />
        </GestureHandlerRootView>
      </View>

      <BottomSection />

      <UpdateAllListsModal
        mainList={updatingMainList}
        updateModalVisible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
        setActiveList={setActiveList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownPressable: {
    width: "100%",
    backgroundColor: colors.card,
    borderColor: colors.borderLight,
    borderWidth: 2,
    borderRadius: 5,
  },

  // Modal Styling
  mainListsView: {
    width: "98%",
    backgroundColor: colors.card,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderColor: colors.borderLight,
    borderWidth: 2,
    borderTopWidth: 0,
    zIndex: 10,
    position: "absolute",
    alignSelf: "center",
  },
});
