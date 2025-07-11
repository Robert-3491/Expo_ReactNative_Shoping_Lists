import { Modal, Pressable, Text, View, StyleSheet } from "react-native";

import { SectionList } from "@/data/models/sectionList";
import { colors } from "@/assets/colors";

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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => setModalVisible(!modalVisible)}
      />

      {/* The modal content */}
      <View style={styles.modalPosition}>
        <View style={styles.modalView}>
          <Text>sec</Text>
          <Text>{sectionList.title}</Text>
          <Text>{sectionList.title}</Text>
          <Text>{sectionList.title}</Text>
          <Text>{sectionList.title}</Text>
          <Text>{sectionList.title}</Text>
          <Text>{sectionList.title}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal Styling
  modalPosition: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: colors.card,
    borderRadius: 5,
    padding: 5,
    borderColor: colors.borderLight,
    borderWidth: 2,
  },
});

export default AddSectionsItemsModal;
