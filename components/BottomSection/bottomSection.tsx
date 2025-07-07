import { Text, View, StyleSheet, StatusBar } from "react-native";
import { colors } from "@/assets/colors";
import { useEffect } from "react";

useEffect(() => {}, []);

export default function BottomSection() {
  return (
    <View style={styles.container}>
      <Text>egweg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
