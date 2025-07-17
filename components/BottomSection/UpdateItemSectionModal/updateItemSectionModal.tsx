import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { SectionList } from "@/data/models/sectionList";
import { Item } from "@/data/models/item";
import UpdateInputsWrapper from "./updateInputsWrapper";
import AddModalButton from "../AddSectionItemsModal/addModalButton";

interface Props {
  sectionList?: SectionList;
  item?: Item;
  updateModalVisible: boolean;
  setUpdateModalVisible: (value: boolean) => void;
}

const UpdateItemSectionModal: React.FC<Props> = ({
  item,
  sectionList,
  updateModalVisible,
  setUpdateModalVisible,
}) => {
  //comp start

  const modalClosingBehaviour = () => {
    setUpdateModalVisible(!updateModalVisible);
    clearText();
  };

  const clearText = () => {
    console.log("Clear text");
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => modalClosingBehaviour()}
      >
        <Pressable
          style={[StyleSheet.absoluteFill, styles.modalOutside]}
          onPress={() => modalClosingBehaviour()}
        />

        {/* The modal content */}
        <View style={styles.modalPosition}>
          <View style={styles.modalView}>
            {/* // */}
            <Text style={styles.header}>
              {item
                ? `Update Item: ${item.title}`
                : `Update Section: ${sectionList?.title}`}
            </Text>

            <UpdateInputsWrapper />

            <AddModalButton
              buttonText="Update"
              onPress={() => console.log("Works")}
              backgroundColor={colors.edit}
            />
          </View>
        </View>
      </Modal>
    </View>
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
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  header: {
    fontSize: 20,
    color: colors.text,
    // textAlign: "center",
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    //backgroundColor: colors.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
  },
});

export default UpdateItemSectionModal;
