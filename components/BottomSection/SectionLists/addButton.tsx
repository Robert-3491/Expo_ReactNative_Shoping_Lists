import { colors } from "@/assets/colors";
import { SectionList } from "@/data/models/sectionList";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import AddSectionsItemsModal from "../AddSectionItemsModal/addSectionsItemsModal";

interface Props {
  sectionList: SectionList;
}

const AddButton: React.FC<Props> = ({ sectionList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSectionList, setCurrentSectionList] = useState(sectionList);
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.iconPressable,
          { opacity: pressed ? 0.4 : 1 },
          styles.iconContainer,
        ]}
        onPress={() => [
          setCurrentSectionList(sectionList),
          setModalVisible(!modalVisible),
        ]}
      >
        <Ionicons name="add-circle" style={styles.addIcon} />
      </Pressable>

      <AddSectionsItemsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sectionList={sectionList}
        currentSectionList={currentSectionList}
        setCurrentSectionList={setCurrentSectionList}
      />
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  iconContainer: {
    width: 55,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderColor: colors.primaryLight,
  },
  iconPressable: {
    flex: 1,
    justifyContent: "center", // horizontal position
    alignItems: "center", // Vertical position
  },
  addIcon: {
    fontSize: 42,
    color: colors.primaryLight,
  },
});
