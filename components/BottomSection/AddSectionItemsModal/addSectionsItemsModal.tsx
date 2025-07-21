import { Modal, Pressable, View, StyleSheet } from "react-native";
import { SectionList } from "@/data/models/sectionList";
import { colors } from "@/assets/colors";
import ToggleAddingMode from "./toggleAddingMode";
import AddingBehavior from "./addingBehavior";
import AddingDestinationText from "./addingDestinationText";
import AddModalButton from "./addModalButton";
import TextInputsWrapper from "./TextInputModal/textInputsWrapper";
import { useState } from "react";
import * as addModalContainer from "@/containers/addModalContainer";

interface Props {
  sectionList: SectionList;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  currentSectionList: SectionList;
  setCurrentSectionList: (val: SectionList) => void;
}

const AddSectionsItemsModal: React.FC<Props> = ({
  sectionList,
  modalVisible,
  setModalVisible,
  currentSectionList,
  setCurrentSectionList,
}) => {
  // component start

  const [addingMode, setAddingMode] = useState("ITEM");
  const [addTitle, setAddTitle] = useState("");
  const [addLink, setAddLink] = useState("");

  const clearText = () => {
    setAddTitle("");
    setAddLink("");
  };

  const modalClosingBehaviour = () => {
    setModalVisible(!modalVisible);
    setCurrentSectionList(sectionList);
    setAddingMode("ITEM");
    clearText();
  };

  const addSection = () => {
    addModalContainer.addSection(
      addTitle,
      setCurrentSectionList,
      clearText,
      modalClosingBehaviour
    );
  };

  const addItem = () => {
    addModalContainer.addItem(
      addTitle,
      currentSectionList,
      addLink,
      clearText,
      modalClosingBehaviour
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => modalClosingBehaviour()}
    >
      <Pressable
        style={[StyleSheet.absoluteFill, styles.modalOutside]}
        onPress={() => modalClosingBehaviour()}
      />

      {/* The modal content */}
      <View style={styles.modalPosition}>
        <View style={styles.modalView}>
          <ToggleAddingMode
            addingMode={addingMode}
            setAddingMode={setAddingMode}
          />

          <AddingBehavior modalClosingBehaviour={modalClosingBehaviour} />

          {addingMode === "ITEM" && (
            <AddingDestinationText
              currentSectionList={currentSectionList}
              newList={currentSectionList.id === sectionList.id}
            />
          )}
          <TextInputsWrapper
            addingMode={addingMode}
            addTitle={addTitle}
            addLink={addLink}
            setAddTitle={setAddTitle}
            setAddLink={setAddLink}
            addItem={addItem}
            addSection={addSection}
          />

          <AddModalButton
            buttonText={addingMode === "ITEM" ? "Add Item" : "Add Section"}
            onPress={addingMode === "ITEM" ? addItem : addSection}
            backgroundColor={colors.primaryLight}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOutside: { backgroundColor: "black", opacity: 0.65 },
  modalPosition: {
    flex: 1,
    justifyContent: "center", //horizontal position
    alignItems: "center", //vertical position
  },
  modalView: {
    width: "85%",
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 10,
    borderColor: colors.borderLight,
    borderWidth: 1,
  },
});

export default AddSectionsItemsModal;
