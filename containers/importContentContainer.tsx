//import * as Clipboard from "expo-clipboard";
import { showError } from "@/Utilities/messages";
import { isWhitespace } from "@/Utilities/textFormating";
import Clipboard from "@react-native-clipboard/clipboard";

export const getClipboardText = async () => {
  return await Clipboard.getString();
};

export const importContentController = (content: string) => {
  if (isWhitespace(content)) {
    showError("Empty import field");
    return;
  }
  const contentArray = content.match(/<[MSIL]>.*?<\/[MSIL]>/g) || [];
  if (!hasItemTag(contentArray)) {
    showError("Invalid import field content.");
    return;
  }
  console.log(hasItemTag(contentArray));

  console.log(contentArray);
};

const hasItemTag = (contentArray: string[]) => {
  return contentArray.some((item) => item.startsWith("<I>"));
};
