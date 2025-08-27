import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/assets/colors";
import Header from "@/components/SharedComponents/header";
import TextDefault from "@/components/SharedComponents/textDefault";
import CustomButton from "@/components/SharedComponents/customButton";
import { router } from "expo-router";

const Tutorial = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" translucent={true} />

      <Header>Welcome!</Header>

      <ScrollView style={styles.textWrapper}>
        <TextDefault margin={{ marginVertical: 15 }}>
          A brief introduction:
        </TextDefault>

        {/* General text */}
        <TextDefault
          color={colors.primaryLight}
          margin={{ fontWeight: "bold" }}
        >
          General
        </TextDefault>
        <TextDefault>
          You can create
          <Text style={{ fontWeight: "bold" }}> Lists</Text> with
          <Text style={{ fontWeight: "bold" }}> Sections</Text> and
          <Text style={{ fontWeight: "bold" }}> items with links.</Text>
        </TextDefault>

        <TextDefault>
          All three are swipeable: Left for delete, right for edit.
        </TextDefault>

        <View style={{ marginTop: 15 }} />

        {/* Settings text */}
        <TextDefault
          color={colors.primaryLight}
          margin={{ fontWeight: "bold" }}
        >
          Settings
        </TextDefault>
        <TextDefault>
          Accessible by pressing{" "}
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>⋮</Text>, allows
          you to control the app&apos;s behaviour.
        </TextDefault>
        <View style={{ marginTop: 15 }} />

        {/* Export/Import text */}
        <TextDefault
          color={colors.primaryLight}
          margin={{ fontWeight: "bold" }}
        >
          Export & Import
        </TextDefault>
        <View style={{ marginTop: 5 }} />

        <TextDefault margin={{ fontWeight: "bold" }}>Sender:</TextDefault>

        <TextDefault>
          Long press on a list (from the top or dropdown), section or item to
          copy the content.
        </TextDefault>
        <TextDefault>Send to receiver.</TextDefault>
        <View style={{ marginTop: 5 }} />

        <TextDefault margin={{ fontWeight: "bold" }}>Receiver:</TextDefault>
        <TextDefault>
          Copy the received content and navigate to import content through{" "}
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>⋮</Text>
        </TextDefault>
        <View style={{ marginTop: 15 }} />

        {/* Tips text */}
        <TextDefault
          color={colors.primaryLight}
          margin={{ fontWeight: "bold" }}
        >
          Tips
        </TextDefault>
        <View style={{ marginTop: 5 }} />

        <TextDefault margin={{ fontWeight: "bold" }}>Links:</TextDefault>

        <TextDefault>
          Long press on the open link icon to copy the link to your clipboard.
        </TextDefault>
        <View style={{ marginTop: 5 }} />

        <TextDefault margin={{ fontWeight: "bold" }}>
          After adding a section:
        </TextDefault>
        <TextDefault>
          Press the &ldquo;Add item&quot; tab to add items directly into the
          newly created section.
        </TextDefault>

        <View style={{ marginTop: 5 }} />

        <TextDefault margin={{ fontWeight: "bold" }}>
          This tutorial can be reopened through{" "}
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>⋮</Text>
        </TextDefault>
      </ScrollView>

      <View style={{ margin: 15 }}>
        <CustomButton
          buttonText="Close"
          onPress={() => router.back()}
          backgroundColor={colors.primaryLight}
        />
      </View>
    </SafeAreaView>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textWrapper: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});
