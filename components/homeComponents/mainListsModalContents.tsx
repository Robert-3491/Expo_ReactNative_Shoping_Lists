import { View, Text, StyleSheet } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import "react-native-gesture-handler";
import { Pressable } from "react-native-gesture-handler";
import { colors } from "@/assets/colors";
import * as MainListsContainer from "@/containers/mainListsContainer";
import { MainList } from "@/data/models/mainList";
import AddMainList from "./addMainList";

interface IProps {
  setModalVisible: (visible: boolean) => void;
}

export default function MainListsModalContents({ setModalVisible }: IProps) {
  const data = MainListsContainer.getMainLists();

  const renderMainList = ({ item }: { item: MainList }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };

  const renderLeftActions = (item: MainList) => {
    return (
      <View style={styles.leftAction}>
        <Text>Edit</Text>
      </View>
    );
  };

  const renderRightActions = (item: MainList) => {
    return (
      <Pressable onPress={() => console.log("Delete action pressed: ", item)}>
        <View style={styles.rightAction}>
          <Text>Delete</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <AddMainList />
      <SwipeableFlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMainList}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingLeft: 10,
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: colors.borderLight,
    width: "100%",
    color: colors.text,
    borderRadius: 5,
  },
  itemText: {
    color: colors.text,
    fontSize: 18,
  },
  leftAction: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  rightAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
});
