import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import TopSection from "../components/TopSection/topSection";
import { colors } from "../assets/colors";
import BottomSection from "@/components/BottomSection/SectionLists/bottomSection";
import { useEffect } from "react";
import { initializeDatabase } from "@/data/db/databaseService";

export default function Index() {
  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDatabase();
    };
    setupDatabase();
  }, []);

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
