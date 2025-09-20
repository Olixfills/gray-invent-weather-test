import { ForecastList } from "@/types";
import { format } from "date-fns";
import { Text, View } from "react-native";
import tw from "twrnc";

export const ForecastCard = ({ item }: { item: ForecastList }) => {
  return (
    <View
      style={tw`border border-gray-200 rounded-lg w-full p-4 my-1 bg-white/20`}
    >
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-gray-800 font-medium`}>
          {format(new Date(item.dt * 1000), "EEEE")}
        </Text>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`text-gray-600 capitalize`}>
            {item?.weather[0].description} {""}
          </Text>
          <Text style={tw`text-gray-800 font-bold`}>
            {Math.round(item?.main.temp)}°C
          </Text>
        </View>
      </View>
    </View>
  );
};
