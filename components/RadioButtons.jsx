import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const RadioButtons = (props) => {
  const [selected, setSelected] = useState();
  return (
    <View className="flex-row gap-3 items-center">
      <Text className="text-lg font-semibold italic">{props.title}</Text>
      {props.options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            className="flex-row gap-2"
            onPress={() => {
              setSelected(option);
              props.setSelectedOption(option);
            }}
          >
            {selected == option ? (
              <Feather name="check-circle" size={20} color="mediumslateblue" />
            ) : (
              <Feather name="circle" size={20} color="mediumslateblue" />
            )}
            <Text className=" font-semibold">{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioButtons;
