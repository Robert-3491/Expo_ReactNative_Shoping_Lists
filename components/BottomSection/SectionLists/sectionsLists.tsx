import { Text, View, StyleSheet, Button } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { colors } from "@/assets/colors";
import { useEffect, useState } from "react";
import { SectionList } from "@/data/models/sectionList";
import DropdownPressable from "@/components/SharedComponents/dropDownPressable";
import * as sectionListsContainer from "@/containers/sectionListsContainer";

export default function SectionsLists() {
  useEffect(() => {
    // Component mounted
  }, []);

  const [data, setdata] = useState(sectionListsContainer.getMainLists());

  // Render individual list sectionLists
  const renderItem = ({ item }: { item: SectionList }) => {
    return (
      <View style={styles.itemContainer}>
        <DropdownPressable
          text={item.title}
          isOpen={item.isVisible}
          onPress={() => console.log("On press")}
          textStyle={{ fontSize: 22 }}
        />
      </View>
    );
  };

  // Render left swipe actions for each sectionList
  const renderLeftActions = ({ item }: { item: SectionList }) => {
    return (
      <View style={styles.actionContainer}>
        <Text>Left Action</Text>
      </View>
    );
  };

  // Render right swipe actions for each sectionList
  const renderRightActions = ({ item }: { item: SectionList }) => {
    return (
      <View style={styles.actionContainer}>
        <Text>Right Action</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeableFlatList
        data={data}
        keyExtractor={(item: SectionList) => item.id.toString()}
        renderItem={renderItem}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
      <Button
        title="Add section"
        onPress={sectionListsContainer.addDummySections}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    backgroundColor: colors.background,
  },
  itemContainer: {
    backgroundColor: colors.surface,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 80,
  },
});
