import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CheckBoxs = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const isChecked = (option) => selectedOptions.some((opt) => opt == option);

  const handleCheck = (option) => {
    if (!isChecked(option)) {
      setSelectedOptions([...selectedOptions, option]);
      props.setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => option != opt));
      props.setSelectedOptions(selectedOptions.filter((opt) => option != opt));
    }
  };
  return (
    <View className="flex-row gap-4 flex-wrap">
      <Text className="text-lg font-semibold italic">{props.title}</Text>
      <View className="flex-row gap-x-2">
        {props.options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex-row gap-x-1 flex-wrap"
              onPress={() => handleCheck(option)}
            >
              <MaterialIcons
                name={
                  isChecked(option) ? "check-box" : "check-box-outline-blank"
                }
                size={24}
                color="mediumslateblue"
              />
              <Text className="font-semibold">{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CheckBoxs;
