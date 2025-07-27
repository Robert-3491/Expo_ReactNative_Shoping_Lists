import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/assets/colors";
import { SectionList } from "@/data/models/sectionList";
import { Item } from "@/data/models/item";
import UpdateInputsWrapper from "./updateInputsWrapper";
import AddModalButton from "../AddSectionItemsModal/addModalButton";
import * as updateModalContainer from "@/containers/updateModalContainer";
import { isWhitespace } from "@/Utilities/textFormating";
import { MainList } from "@/data/models/mainList";

interface Props {
  sectionList?: SectionList;
  item?: Item;
  mainList?: MainList;
  updateModalVisible: boolean;
  setUpdateModalVisible: (value: boolean) => void;
  setActiveList: (value: string) => void;
}

const UpdateAllListsModal: React.FC<Props> = ({
  mainList,
  item,
  sectionList,
  updateModalVisible,
  setUpdateModalVisible,
  setActiveList,
}) => {
  //comp start

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateLink, setUpdateLink] = useState("");

  // Update state when props change
  useEffect(() => {
    if (item) {
      setUpdateTitle(item.title ?? "");
      setUpdateLink(item.link ?? "");
    }
    if (sectionList) {
      setUpdateTitle(sectionList.title ?? "");
    }
    if (mainList) {
      setUpdateTitle(mainList.title ?? "");
    }
  }, [item, sectionList, mainList]);

  const modalClosingBehaviour = () => {
    setUpdateModalVisible(!updateModalVisible);
    setUpdateTitle(item?.title ?? sectionList?.title ?? mainList?.title ?? "");
    setUpdateLink(item?.link ?? "");
  };

  const modalUpdateItem = () => {
    if (item)
      updateModalContainer.modalUpdateItem(
        item,
        updateTitle,
        updateLink,
        modalClosingBehaviour
      );
  };

  const modalUpdateSection = () => {
    updateModalContainer.modalUpdateSection(
      sectionList?.id ?? 0,
      updateTitle,
      modalClosingBehaviour
    );
  };

  const modalUpdateMainList = () => {
    if (mainList)
      updateModalContainer.modalUpdateList(
        mainList,
        updateTitle,
        modalClosingBehaviour,
        setActiveList
      );
  };

  const headerText = () => {
    if (item) return `Update Item: ${item.title}`;
    if (sectionList) return `Update Section: ${sectionList.title}`;
    if (mainList) return `Update List: ${mainList.title}`;
  };

  const updateButtonPress = () => {
    if (item) modalUpdateItem();
    if (sectionList) modalUpdateSection();
    if (mainList) modalUpdateMainList();
  };

  const buttonText = (): string => {
    if (item) return "Update Item";
    if (sectionList) return "Update Section";
    if (mainList) return "Update List";
    return "undefined";
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

            <Text style={styles.header}>{headerText()}</Text>

            <UpdateInputsWrapper
              updateTitle={updateTitle}
              setUpdateTitle={setUpdateTitle}
              updateLink={updateLink}
              setUpdateLink={setUpdateLink}
              item={item}
              modalUpdateItem={modalUpdateItem}
              modalUpdateSection={modalUpdateSection}
            />

            <AddModalButton
              buttonText={buttonText()}
              onPress={() => updateButtonPress()}
              backgroundColor={
                isWhitespace(updateTitle) ? colors.disabled : colors.edit
              }
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
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    marginBottom: 15,
  },
});

export default UpdateAllListsModal;
