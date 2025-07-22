import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";
import { colors } from "../../assets/colors";
import { useState, useEffect, useRef } from "react";
import MainListsModalContents from "./mainListsModalContents";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as dbRepoList from "@/data/db/dbRepoList";
import DropdownPressable from "../SharedComponents/dropDownPressable";

export default function TopSection() {
  const [activeList, setActiveList] = useState("Loading...");
  const [modalVisible, setModalVisible] = useState(false);
  const [pressableHeight, setPressableHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

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

  // Function to get the HEIGHT of the Pressable component - to be used for modal top margin
  const handlePressableLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPressableHeight(height);
  };

  // Calculate the height of the modal based on screen height and pressable height
  const modalHeight = screenHeight - pressableHeight;

  // Exit edit mode before closing modal
  const toggleModal = () => {
    modalRef.current?.exitEdit();
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Pressable section that toggles the modal */}
      <DropdownPressable
        text={activeList}
        isOpen={modalVisible}
        onPress={toggleModal}
        onLayout={handlePressableLayout}
      />

      {/* The modal that contains the main lists */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        {/* GestureHandlerRootView is used to handle gestures in the modal - required HERE*/}
        <GestureHandlerRootView>
          {/* Close the modal when tapping outside the modal content */}
          <Pressable style={StyleSheet.absoluteFill} onPress={toggleModal} />

          {/* The modal content */}
          <View style={styles.modalPosition}>
            <View
              style={[
                styles.modalView,
                {
                  marginTop: pressableHeight + 4,
                  height: modalHeight - 4,
                },
              ]}
            >
              {/* MainListsModalContents => the component that renders the lists */}
              <MainListsModalContents
                ref={modalRef}
                setModalVisible={toggleModal}
                setActiveList={setActiveList}
              />
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.card,
    borderColor: colors.borderLight,
    borderWidth: 2,
    borderRadius: 5,
  },

  // Modal Styling
  modalPosition: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modalView: {
    width: "70%",
    backgroundColor: colors.card,
    borderRadius: 5,
    padding: 5,
    borderColor: colors.borderLight,
    borderWidth: 2,
    borderTopWidth: 0,
  },
});
