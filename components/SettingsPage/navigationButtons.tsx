import { View } from "react-native";
import React from "react";
import CustomButton from "../SharedComponents/customButton";
import { colors } from "@/assets/colors";
import { router } from "expo-router";

const NavigationButtons = () => {
  return (
    <View>
      <View style={{ marginTop: 10 }} />
      <CustomButton
        buttonText="Show Tutorial"
        onPress={() => router.navigate("./tutorial")}
        backgroundColor={colors.primaryLight}
        fontSize={18}
      />

      <View style={{ marginTop: 5 }} />

      <CustomButton
        buttonText="Import Content"
        onPress={() => router.navigate("/importContent")}
        backgroundColor={colors.successToast}
        fontSize={18}
      />
    </View>
  );
};

export default NavigationButtons;
