import { View, StyleSheet } from "react-native";
import SectionsLists from "./sectionsLists";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BottomSection() {
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <SectionsLists />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
