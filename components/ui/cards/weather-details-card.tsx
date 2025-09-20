import { Text, View } from "react-native";
import tw from "twrnc";

export const WeatherDetailsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <View style={tw`items-center mt-4 w-1/3`}>
      <View>{icon}</View>
      <Text style={tw`text-base font-semibold text-gray-800`}>{title}</Text>
      <Text style={tw`text-base font-semibold text-gray-700`}>{value}</Text>
    </View>
  );
};
