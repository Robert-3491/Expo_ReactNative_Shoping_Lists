import { StyleSheet, StatusBar, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/Utilities/toastConfig";

import TopSection from "../components/TopSection/topSection";
import { colors } from "../assets/colors";
import BottomSection from "@/components/BottomSection/SectionLists/bottomSection";
import { useEffect, useState } from "react";
import { initializeDatabase } from "@/data/db/databaseService";
import { initializeSettings } from "@/data/db/dbRepoSettings";
import { initializeMainLists } from "@/containers/mainListsContainer";
import { initializeSectionLists } from "@/containers/sectionListsContainer";
import { initializeItemLists } from "@/containers/itemsContainer";
import LoadingSpinner from "@/components/loadingSpinner";

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
    };
    setupDatabase();
  }, []);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TopSection />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
