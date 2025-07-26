import { View, StyleSheet } from "react-native";
import { colors } from "../../assets/colors";
import { useState, useEffect, useRef } from "react";
import MainListsModalContents from "./mainListsModalContents";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as dbRepoList from "@/data/db/dbRepoList";
import DropdownPressable from "../SharedComponents/dropDownPressable";
import BottomSection from "../BottomSection/SectionLists/bottomSection";

export default function TopSection() {
  const [activeList, setActiveList] = useState("Loading...");
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dropdownPressable}>
        {/* Pressable section that toggles the modal */}
        <DropdownPressable
          text={activeList}
          isOpen={modalVisible}
          onPress={toggleModal}
        />
      </View>

      {/* The modal content */}

      <View
        style={[
          styles.mainListsView,
          { display: modalVisible ? "flex" : "none" },
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
    width: "70%",
    height: "100%",
    maxHeight: "100%",
    //minHeight: "40%",

    backgroundColor: colors.card,
    borderRadius: 5,
    padding: 5,
    borderColor: colors.borderLight,
    borderWidth: 2,
    zIndex: 10,
    flex: 1,
    position: "absolute",
  },
});
