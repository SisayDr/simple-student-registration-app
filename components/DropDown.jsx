import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DropDown = (props) => {
  const [title, setTitle] = useState(props.title);
  const [dropDownOpened, setDropDownOpened] = useState(false);
  return (
    <View className="border rounded border-indigo-400">
      <TouchableOpacity
        className="flex-row justify-between items-center px-3"
        onPress={() => setDropDownOpened(!dropDownOpened)}
      >
        <Text className="p-3">{title}</Text>
        {dropDownOpened ? (
          <AntDesign name="up" size={16} color="black" />
        ) : (
          <AntDesign name="down" size={16} color="black" />
        )}
      </TouchableOpacity>
      <View
        className={(!dropDownOpened ? "hidden" : "") + " border-indigo-500"}
      >
        {props.options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="p-4 shadow border-b border-indigo-500"
              onPress={() => {
                setTitle(option);
                props.setSelectedOption(option);
                setDropDownOpened(false);
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default DropDown;
