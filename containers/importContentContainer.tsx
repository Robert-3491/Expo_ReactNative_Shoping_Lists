//import * as Clipboard from "expo-clipboard";
import Clipboard from "@react-native-clipboard/clipboard";

export const getClipboardText = async () => {
  return await Clipboard.getString();
};
