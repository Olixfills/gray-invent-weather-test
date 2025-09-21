import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudSun,
  Cloudy,
  Moon,
  Search,
  Snowflake,
  Sun,
  Sunrise,
} from "lucide-react-native";

import { WeatherData } from "@/types";
import { format } from "date-fns";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

type WeatherIconProps = {
  icon: string;
  size?: number;
  color?: string;
};

const WeatherIcon = ({ icon, size = 48, color = "#fff" }: WeatherIconProps) => {
  let Icon: React.ComponentType<any>;

  switch (icon) {
    case "01d":
      Icon = Sunrise;
      break;
    case "01n":
      Icon = Moon;
      break;
    case "02d":
      Icon = CloudSun;
      break;
    case "02n":
      Icon = CloudMoon;
      break;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      Icon = Cloudy;
      break;
    case "09d":
    case "09n":
      Icon = CloudRain;
      break;
    case "10d":
      Icon = Sun;
      break;
    case "10n":
      Icon = CloudMoonRain;
      break;
    case "11d":
    case "11n":
      Icon = CloudLightning;
      break;
    case "13d":
    case "13n":
      Icon = Snowflake;
      break;
    case "50d":
    case "50n":
      Icon = CloudFog;
      break;
    default:
      Icon = Cloud;
  }

  return <Icon size={size} color={color} />;
};

const WeatherHeader = ({
  onPressSearch,
  weather,
  loading,
}: {
  onPressSearch?: () => void;
  weather: WeatherData | null;
  loading?: boolean;
}) => {
  return (
    <View style={tw`flex-row items-center justify-between mt-4`}>
      <View style={tw`flex-col items-center`}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <WeatherIcon
            icon={weather?.weather[0].icon || ""}
            size={24}
            color="#fff"
          />
        )}
        <Text style={tw`text-white mt-2 text-xs`}>
          {format(new Date(), "PP")}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPressSearch}
        activeOpacity={0.8}
        style={tw`p-2`}
      >
        <Search size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default WeatherHeader;

const styles = StyleSheet.create({});
