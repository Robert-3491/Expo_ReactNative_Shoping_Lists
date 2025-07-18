import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/assets/colors";
import { SectionList } from "@/data/models/sectionList";
import { Item } from "@/data/models/item";
import UpdateInputsWrapper from "./updateInputsWrapper";
import AddModalButton from "../AddSectionItemsModal/addModalButton";
import * as updateModalContainer from "@/containers/updateModalContainer";

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

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateLink, setUpdateLink] = useState("");

  // Update state when props change
  useEffect(() => {
    if (item) {
      setUpdateTitle(item.title ?? "");
      setUpdateLink(item.link ?? "");
    } else if (sectionList) {
      setUpdateTitle(sectionList.title ?? "");
    }
  }, [item, sectionList]);

  const modalClosingBehaviour = () => {
    setUpdateModalVisible(!updateModalVisible);
    setUpdateTitle(item ? item.title ?? "" : sectionList?.title ?? "");
    setUpdateLink(item?.link ?? "");
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
            {/* Modal composition */}

            <Text style={styles.header}>
              {item
                ? `Update Item: ${item.title}`
                : `Update Section: ${sectionList?.title}`}
            </Text>

            <UpdateInputsWrapper
              updateTitle={updateTitle}
              setUpdateTitle={setUpdateTitle}
              updateLink={updateLink}
              setUpdateLink={setUpdateLink}
              item={item}
            />

            <AddModalButton
              buttonText={item ? "Update Item" : "Update Section"}
              onPress={() =>
                item
                  ? updateModalContainer.modalUpdateItem
                  : updateModalContainer.modalUpdateSection(
                      sectionList?.id ?? 0,
                      updateTitle,
                      modalClosingBehaviour
                    )
              }
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
