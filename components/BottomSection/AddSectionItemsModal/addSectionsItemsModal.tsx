import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";

import { SectionList } from "@/data/models/sectionList";
import { colors } from "@/assets/colors";
import ToggleAddingMode from "./toggleAddingMode";
import { useRef, useState } from "react";
import AddingBehavior from "./addingBehavior";
import AddingDestinationText from "./addingDestinationText";
import TextInputModal from "./textInputModal";
import AddModalButton from "./addModalButton";

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

  const linkInputRef = useRef<TextInput>(null);

  const focusNextInput = () => {
    linkInputRef.current?.focus();
  };

  return (
    <Modal
      animationType="slide"
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
          <TextInputModal
            placeholder="Item name - required"
            onSubmitEditing={focusNextInput}
            style={{ marginBottom: 10 }}
          />
          <TextInputModal
            placeholder="Link - optional"
            ref={linkInputRef}
            selectTextOnFocus={true}
            onSubmitEditing={() => console.log("not implementd")}
          />
          <AddModalButton />
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
