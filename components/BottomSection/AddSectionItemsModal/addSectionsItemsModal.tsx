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
}

const AddSectionsItemsModal: React.FC<Props> = ({
  sectionList,
  modalVisible,
  setModalVisible,
}) => {
  //
  //
  const [currentSectionList, setCurrentSectionList] = useState(sectionList);
  const [addingMode, setAddingMode] = useState("ITEM");
  const [addTitle, setAddTitle] = useState("");
  const [addLink, setAddLink] = useState("");

  const addSection = () => {
    addModalContainer.addSection(addTitle);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <Pressable
        style={[StyleSheet.absoluteFill, styles.modalOutside]}
        onPress={() => setModalVisible(!modalVisible)}
      />

      {/* The modal content */}
      <View style={styles.modalPosition}>
        <View style={styles.modalView}>
          <ToggleAddingMode
            addingMode={addingMode}
            setAddingMode={setAddingMode}
          />
          <AddingBehavior />
          {addingMode === "ITEM" && (
            <AddingDestinationText currentSectionList={currentSectionList} />
          )}
          <TextInputsWrapper
            addingMode={addingMode}
            addTitle={addTitle}
            addLink={addLink}
            setAddTitle={setAddTitle}
            setAddLink={setAddLink}
          />

          <AddModalButton
            buttonText={addingMode === "ITEM" ? "Add Item" : "Add Section"}
            onPress={
              addingMode === "ITEM"
                ? () => console.log("Not Implem")
                : addSection
            }
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
