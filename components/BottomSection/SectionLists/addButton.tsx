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

  return (
    <View style={styles.iconContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.iconPressable,
          { opacity: pressed ? 0.4 : 1 },
        ]}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Ionicons name="add-circle" style={styles.addIcon} />
      </Pressable>

      <AddSectionsItemsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sectionList={sectionList}
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
    borderColor: colors.border,
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
