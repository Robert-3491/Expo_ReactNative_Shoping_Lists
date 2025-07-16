import { colors } from "@/assets/colors";
import { View, StyleSheet, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemsFlatList from "../ItemLists/itemsFlatList";

interface Props {
  sectionId: number;
  style?: ViewStyle;
}

const ItemsView: React.FC<Props> = ({ sectionId, style }) => {
  return (
    <GestureHandlerRootView>
      <View style={[styles.container, style]}>
        <ItemsFlatList sectionId={sectionId} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
    alignSelf: "center",
    backgroundColor: colors.itemBackground,
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 10,
  },
});

export default ItemsView;
