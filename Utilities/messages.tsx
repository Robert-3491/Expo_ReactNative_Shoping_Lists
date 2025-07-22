import Toast from "react-native-toast-message";

//import { showError } from "@/Utilities/messages";
//import { showSuccess } from "@/Utilities/messages";
//import { showInfo } from "@/Utilities/messages";

export const showError = () => {
  Toast.show({
    type: "error",
    text2: "Please enter a title",
    visibilityTime: 1500,
  });
};

export const showSuccess = (message: string) => {
  Toast.show({
    type: "success",
    text2: message,
    visibilityTime: 1500,
  });
};

export const showEdit = () => {
  Toast.show({
    type: "info",
    text2: "Info",
    visibilityTime: 1500,
  });
};
