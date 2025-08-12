import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../SharedComponents/customButton";
import { colors } from "@/assets/colors";
import { router } from "expo-router";

const NavigationButtons = () => {
  return (
    <View>
      <View style={{ marginTop: 10 }} />
      <CustomButton
        buttonText="Import Content"
        onPress={() => router.navigate("/importContent")}
        backgroundColor={colors.primaryLight}
        fontSize={18}
      />
      <View style={{ marginTop: 5 }} />
      <CustomButton
        buttonText="Show Tutorial"
        onPress={() => console.log("Works")}
        backgroundColor={colors.primaryLight}
        fontSize={18}
      />
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({});
