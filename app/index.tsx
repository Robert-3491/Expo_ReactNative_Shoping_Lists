import { Text, View, StyleSheet, StatusBar, SafeAreaView } from "react-native";

import TopSection from "../components/homeComponents/topSection";
import { colors } from "../assets/colors";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <TopSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
