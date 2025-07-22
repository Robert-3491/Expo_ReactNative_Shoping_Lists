// toastConfig.js
import { colors } from "@/assets/colors";
import React from "react";
import { ErrorToast, BaseToast } from "react-native-toast-message";

export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.error,
      }}
      text2Style={{
        fontSize: 18,
        color: colors.text,
      }}
    />
  ),

  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#28a745",
        borderLeftColor: "#155724",
        borderLeftWidth: 5,
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 16,
        color: "white",
      }}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#17a2b8",
        borderLeftColor: "#0c5460",
        borderLeftWidth: 5,
      }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 16,
        color: "white",
      }}
    />
  ),
};
