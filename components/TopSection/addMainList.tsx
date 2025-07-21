import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import * as mainListsContainer from "@/containers/mainListsContainer";
import * as textFormating from "@/containers/textFormating";

interface IProps {
  reloadMainList: () => void;
  setActiveList: (mainListTitle: string) => void;
}

export default function AddMainList({ reloadMainList, setActiveList }: IProps) {
  const [title, setTitle] = useState("");
  const [isInputFocus, setisInputFocus] = useState(false);

  // Reference for handleIconPress focusing
  const textInputRef = useRef<TextInput>(null);

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
        autoCorrect={false}
        placeholder="Press to add a new list"
        placeholderTextColor={colors.disabled}
        selectTextOnFocus={true}
        style={[
          styles.addInput,
          {
            borderWidth: isInputFocus ? 2 : 0,
            borderColor: isInputFocus ? "#1976D2" : "transparent",
          },
        ]}
        onFocus={() => setisInputFocus(true)}
        onBlur={() => setisInputFocus(false)}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => addMainListHelper()}
        autoFocus={mainListsContainer.isMainListEmpty() ? true : false}
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
