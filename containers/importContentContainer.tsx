import * as Clipboard from "expo-clipboard";

let clipboardText = "";

export const handlePasteFromClipboard = async () => {
  clipboardText = await Clipboard.getStringAsync();
  console.log(clipboardText);
};
