import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../assets/colors";
import { useState, useEffect, useRef } from "react";
import MainListsModalContents from "./mainListsModalContents";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import * as dbRepoList from "@/data/db/dbRepoList";
import DropdownPressable from "../SharedComponents/dropDownPressable";
import BottomSection from "../BottomSection/SectionLists/bottomSection";

const { height: windowHeight } = Dimensions.get("window");

export default function TopSection() {
  const [activeList, setActiveList] = useState("Loading...");
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  // Ref to access MainListsModalContents functions
  const modalRef = useRef<{ exitEdit: () => void }>(null);

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
    modalRef.current?.exitEdit();
    setModalVisible(!modalVisible);
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
          <MainListsModalContents
            ref={modalRef}
            setModalVisible={toggleModal}
            setActiveList={setActiveList}
          />
        </GestureHandlerRootView>
      </View>

      <BottomSection />
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
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 5,
    padding: 5,
    borderColor: colors.borderLight,
    borderWidth: 2,
    borderTopWidth: 0,
    zIndex: 10,
    position: "absolute",
  },
});
