import { Text, View, StyleSheet, StatusBar } from "react-native";
import { colors } from "@/assets/colors";
import { useEffect } from "react";
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
