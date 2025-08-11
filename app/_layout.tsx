import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/Utilities/toastConfig";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>

      {/* Toast at app root - always available */}
      <Toast config={toastConfig} />
    </View>
  );
}
