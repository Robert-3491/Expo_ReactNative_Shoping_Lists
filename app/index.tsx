import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import TopSection from "../components/TopSection/topSection";
import { colors } from "../assets/colors";
import { initializeDatabase } from "@/data/db/databaseService";
import { useEffect } from "react";
import BottomSection from "@/components/BottomSection/SectionLists/bottomSection";

useEffect(() => {
  initializeDatabase();
}, []);

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <TopSection />
      <BottomSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
