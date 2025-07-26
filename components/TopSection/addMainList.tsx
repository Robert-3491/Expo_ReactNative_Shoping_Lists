import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native"; // ← Move TextInput here
import { Pressable } from "react-native-gesture-handler"; // ← Only Pressable from gesture handler
import { useEffect, useRef, useState } from "react";
import * as mainListsContainer from "@/containers/mainListsContainer";
import * as textFormating from "@/Utilities/textFormating";

interface IProps {
  reloadMainList: () => void;
  setActiveList: (mainListTitle: string) => void;
}

export default function AddMainList({ reloadMainList, setActiveList }: IProps) {
  const [title, setTitle] = useState("");
  const [isInputFocus, setisInputFocus] = useState(false);

  // Reference for handleIconPress focusing
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (mainListsContainer.isMainListEmpty()) {
      // Add delay for usability...
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, []);

  const addMainListHelper = () => {
    mainListsContainer.addMainList(title, reloadMainList, setActiveList);
  };

  // Function to handle ADD icon press
  function handleIconPress() {
    addMainListHelper();
    textInputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        autoFocus={false}
        autoCorrect={false}
        placeholder="Tap here to add a new list"
        placeholderTextColor={colors.disabled}
        selectTextOnFocus={true}
        style={[
          styles.addInput,
          {
            borderColor: isInputFocus ? "#1976D2" : "transparent",
          },
        ]}
        onFocus={() => setisInputFocus(true)}
        onBlur={() => setisInputFocus(false)}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => addMainListHelper()}
      />
      {/* Pressable icon that adds the new list or focus on TextInput */}
      <Pressable onPress={() => handleIconPress()}>
        <Ionicons
          name={
            textFormating.isWhitespace(title)
              ? "add-circle"
              : "checkmark-circle"
          }
          color={
            textFormating.isWhitespace(title)
              ? colors.primaryLight
              : colors.success
          }
          size={45}
        />
      </Pressable>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },

  addInput: {
    width: "85%",
    borderRadius: 5,
    borderWidth: 2,
    fontSize: 18,
    color: colors.text,
    textAlignVertical: "center",
  },

  addIcon: {
    width: "15%",
    height: "100%",
    alignContent: "flex-end",
  },
});
