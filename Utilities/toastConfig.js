// toastConfig.js
import { colors } from "@/assets/colors";
import React from "react";
import { ErrorToast, BaseToast } from "react-native-toast-message";

export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      style={[styles.error, styles.card]}
      text2Style={textStyles.text2}
    />
  ),

  success: (props) => (
    <BaseToast
      {...props}
      style={[styles.success, styles.card]}
      text2Style={textStyles.text2}
    />
  ),

  edit: (props) => (
    <BaseToast
      {...props}
      style={[styles.info, styles.card]}
      text2Style={textStyles.text2Info}
    />
  ),
};

// Toast Styles
const styles = {
  error: {
    borderColor: colors.error,
  },
  success: {
    borderColor: colors.successToast,
  },
  info: {
    borderColor: colors.info,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderLeftWidth: 3,
  },
};

// Text Styles
const textStyles = {
  text2: {
    fontSize: 18,
    color: colors.text,
  },
};
