import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/assets/colors";

interface Props {
  sectionId: number;
}

const ItemsFlatList: React.FC<Props> = ({ sectionId }) => {
  const data = [
    {
      id: "1",
      title: "Buy groceries",
      description: "Milk, eggs, bread, and vegetables",
      status: "pending",
      category: "shopping",
    },
    {
      id: "2",
      title: "Walk the dog",
      description: "Take Max for a 30-minute walk in the park",
      status: "completed",
      category: "pets",
    },
  ];

  interface Item {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
  }

  const renderItem = ({ item }: { item: Item }) => {
    // Render individual list items
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const renderLeftActions = (item: Item) => {
    // Render left swipe actions for each item
    return <Text>LEFT</Text>;
  };

  const renderRightActions = (item: Item) => {
    // Render right swipe actions for each item
    return <Text>DELTE</Text>;
  };

  return (
    <SwipeableFlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    backgroundColor: colors.border,
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default ItemsFlatList;
