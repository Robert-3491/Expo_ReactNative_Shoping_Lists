import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "@/assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingSpinner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryLight} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
