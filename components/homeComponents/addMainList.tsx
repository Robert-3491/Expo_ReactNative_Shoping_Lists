import { colors } from "@/assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import * as MainListsContainer from "@/containers/mainListsContainer";
import { MainList } from "@/data/models/mainList";

interface IProps {
  reloadMainList: () => void;
  setActiveList: (mainListTitle: string) => void;
}

export default function AddMainList({ reloadMainList, setActiveList }: IProps) {
  const [title, setTitle] = useState("");
  const [isInputFocus, setisInputFocus] = useState(false);

  // Reference for handleIconPress focusing
  const textInputRef = useRef<TextInput>(null);

  // Function to add a new main list. To be called by icon and keyboard submit
  const addMainList = () => {
    if (title.length > 0) {
      MainListsContainer.addMainList(new MainList(title));
      reloadMainList();
      setActiveList(title); // Set the active list Title
    }
  };
  // Function to handle ADD icon press
  function handleIconPress() {
    addMainList();
    textInputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        autoCorrect={false}
        placeholder="Add new list"
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
        onSubmitEditing={() => addMainList()}
      />
      {/* Pressable icon that adds the new list or focus on TextInput */}
      <Pressable style={styles.container} onPress={() => handleIconPress()}>
        <Ionicons
          style={styles.addIcon}
          name={title.length > 0 ? "checkmark-circle" : "add-circle"}
          color={title.length > 0 ? colors.success : colors.primaryLight}
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
