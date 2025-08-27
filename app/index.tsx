import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopSection from "../components/TopSection/topSection";
import { colors } from "../assets/colors";
import { useEffect, useState } from "react";
import { initializeDatabase } from "@/data/db/databaseService";
import {
  getTutorialShown,
  initializeSettings,
  setTrueTutorialShown,
} from "@/data/db/dbRepoSettings";
import { initializeMainLists } from "@/containers/mainListsContainer";
import { initializeSectionLists } from "@/containers/sectionListsContainer";
import { initializeItemLists } from "@/containers/itemsContainer";
import LoadingSpinner from "@/Utilities/loadingSpinner";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function Index() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDatabase();
      await initializeSettings();
      await initializeMainLists();
      await initializeSectionLists();
      await initializeItemLists();

      setIsInitialized(true);
      if (!getTutorialShown()) {
        router.navigate("./tutorial");
        setTrueTutorialShown();
      }
    };
    setupDatabase();
  }, []);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" translucent={true} />
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
