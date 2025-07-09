import { colors } from "@/assets/colors";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemsFlatList from "../ItemLists/itemsFlatList";

interface Props {
  sectionId: number;
}

const ItemsView: React.FC<Props> = ({ sectionId }) => {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ItemsFlatList sectionId={sectionId} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignSelf: "center",
    backgroundColor: colors.border,
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default ItemsView;
