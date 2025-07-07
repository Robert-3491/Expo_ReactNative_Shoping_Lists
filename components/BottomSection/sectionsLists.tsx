import { Text, View, StyleSheet, StatusBar } from "react-native";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { colors } from "@/assets/colors";
import { useEffect } from "react";
import { SectionList } from "@/data/models/sectionList";

export default function SectionsLists() {
  useEffect(() => {
    // Component mounted
  }, []);

  let data: SectionList[] = [
    new SectionList("ffff", true, 0),
    new SectionList("wafwesatg", true, 1, 2),
  ];

  // Fix: renderItem must receive an object with item property
  const renderItem = ({ item }: { item: SectionList }) => {
    // Render individual list sectionLists
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  // Fix: renderLeftActions must receive an object with item property
  const renderLeftActions = ({ item }: { item: SectionList }) => {
    // Render left swipe actions for each sectionList
    return (
      <View style={styles.actionContainer}>
        <Text>Left Action</Text>
      </View>
    );
  };

  // Fix: renderRightActions must receive an object with item property
  const renderRightActions = ({ item }: { item: SectionList }) => {
    // Render right swipe actions for each sectionList
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
    padding: 16,
    backgroundColor: colors.surface,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 80,
  },
});
