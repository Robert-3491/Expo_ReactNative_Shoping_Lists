import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";
import { colors } from "../../../assets/colors";
import { useState } from "react";
import TopSectionAllLists from "./topSectionAllList";

export default function TopSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pressableHeight, setPressableHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  const handlePressableLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPressableHeight(height);
  };

  const modalHeight = screenHeight - pressableHeight - 4;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.pressSection}
        onLayout={handlePressableLayout}
      >
        <Ionicons
          name={modalVisible ? "caret-up-outline" : "caret-down-outline"}
          style={[styles.dropdownIcon, styles.pressSectionElements]}
        />
        <Text style={[styles.activeListsText, styles.pressSectionElements]}>
          Active List
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setModalVisible(!modalVisible)}
        />

        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                marginTop: pressableHeight + 2,
                height: modalHeight,
              },
            ]}
          >
            {/* THE LISTS COMPONENT*/}
            <TopSectionAllLists setModalVisible={setModalVisible} />
          </View>
        </View>
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
  pressSection: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: 15,
  },
  pressSectionElements: {
    fontSize: 25,
    color: colors.text,
  },
  dropdownIcon: {
    marginHorizontal: 5,
    verticalAlign: "middle",
  },
  activeListsText: {
    color: colors.text,
  },

  // Modal Styling
  centeredView: {
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
  },
});
