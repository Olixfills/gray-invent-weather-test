import AppBottomSheet, {
  AppBottomSheetRef,
} from "@/components/app-bottom-sheet";
import Button from "@/components/Button";
import { ForecastCard } from "@/components/ui/cards/forecast-card";
import { WeatherDetailsCard } from "@/components/ui/cards/weather-details-card";
import WeatherHeader from "@/components/weather-header";
import { processForecastData } from "@/constants/weather helpers";
import { useDebounce } from "@/hooks/use-debounce";
import { ForecastList, LocationData, WeatherData } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { Droplets, Haze, MapPin, Search, Wind, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const GEO_API_URL = process.env.EXPO_PUBLIC_GEO_API_URL;

const WeatherScreen = () => {
  const searchSheetRef = useRef<AppBottomSheetRef>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null
  );
  const [processedForecast, setProcessedForecast] = useState<ForecastList[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { debounce } = useDebounce();

  const handleOpenSheet = () => {
    searchSheetRef.current?.open();
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to get weather data."
        );
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get location name from coordinates
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        setCurrentLocation({
          name: place.city || place.district || "Unknown",
          country: place.isoCountryCode || "Unknown",
          lat: latitude,
          lon: longitude,
        });
      }

      // Fetch weather data
      await fetchWeatherData(latitude, longitude);
      await fetchForecastData(latitude, longitude);
    } catch (error) {
      console.log("Error getting location:", error);
      Alert.alert("Error", "Failed to get current location weather data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);

      if (searchSheetRef.current?.close()) {
        searchSheetRef.current.close();
      }
    } catch (error) {
      console.log("Error fetching weather:", error);
      Alert.alert("Error", "Failed to fetch weather data.");
    }
  };

  const fetchForecastData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data = await response.json();

      // Process forecast data to get one entry per day
      const processed = processForecastData(data.list);
      setProcessedForecast(processed);
    } catch (error) {
      console.log("Error fetching forecast:", error);
      Alert.alert("Error", "Failed to fetch forecast data.");
    }
  };

  const searchLocations = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await fetch(
        `${GEO_API_URL}?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${OPENWEATHER_API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        const locations = data.map((item: any) => ({
          name: item.name,
          country: item.country,
          lat: item.lat,
          lon: item.lon,
        }));
        setSearchResults(locations);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearch = debounce(searchLocations, 500);
  const handleLocationSelect = async (location: LocationData) => {
    try {
      setLoading(true);
      setCurrentLocation(location);
      await fetchWeatherData(location.lat, location.lon);
      await fetchForecastData(location.lat, location.lon);
      searchSheetRef.current?.close();
      setSearchQuery("");
      setSearchResults([]);
    } catch (error) {
      console.log("Error getting weather for selected location:", error);
      Alert.alert("Error", "Failed to get weather for selected location.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (currentLocation) {
        await fetchWeatherData(currentLocation.lat, currentLocation.lon);
        await fetchForecastData(currentLocation.lat, currentLocation.lon);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      Alert.alert("Error", "Failed to refresh weather data.");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.gradient}
      >
        <SafeAreaView style={tw`flex-1`}>
          <ScrollView
            style={tw`flex-1`}
            contentContainerStyle={tw`pb-4`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            <View style={tw`px-4`}>
              <WeatherHeader
                onPressSearch={handleOpenSheet}
                weather={weatherData}
                loading={loading}
              />
              <View style={tw`items-center mt-4`}>
                <Text style={tw`text-white text-base font-bold`}>
                  {currentLocation?.name}, {currentLocation?.country}{" "}
                  {loading && <ActivityIndicator color={"#fff"} size="small" />}
                </Text>
                <Text style={tw`text-white text-7xl font-bold mt-4`}>
                  {weatherData?.main?.temp
                    ? Math.round(weatherData.main.temp)
                    : ""}
                  °C
                </Text>
                <Text style={tw`text-white text-base font-bold capitalize`}>
                  {weatherData?.weather?.[0]?.description || ""}
                </Text>
              </View>

              <View
                style={tw.style(
                  `flex-row items-center justify-between mt-4 gap-1`,
                  styles.weatherDetailsCard
                )}
              >
                <WeatherDetailsCard
                  title="Feels Like"
                  value={`${
                    weatherData?.main?.feels_like
                      ? Math.round(weatherData.main.feels_like)
                      : ""
                  }°C`}
                  icon={<Haze />}
                />
                <WeatherDetailsCard
                  title="Humidity"
                  value={`${weatherData?.main?.humidity || ""}%`}
                  icon={<Droplets />}
                />
                <WeatherDetailsCard
                  title="Wind Speed"
                  value={`${weatherData?.wind?.speed || ""} m/s`}
                  icon={<Wind />}
                />
              </View>

              <View style={tw.style(`mt-4 px-4`, styles.weatherDetailsCard)}>
                <Text style={tw`text-base font-medium text-gray-700 my-2`}>
                  5-Day Forecast
                </Text>
                <View
                  style={tw.style(
                    Platform.OS === "ios" ? `max-h-80` : `max-h-95`
                  )}
                >
                  <FlatList
                    data={processedForecast}
                    renderItem={({ item }) => <ForecastCard item={item} />}
                    keyExtractor={(item) => item?.dt?.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    style={tw`flex-grow-0`}
                    ListEmptyComponent={
                      loading ? (
                        <View style={tw`items-center mt-4 justify-center h-80`}>
                          <ActivityIndicator size="small" color="#fff" />
                        </View>
                      ) : (
                        <Text style={tw`text-white text-center mt-4`}>
                          No data available
                        </Text>
                      )
                    }
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={["#fff"]} // iOS
                        tintColor="#fff" // iOS
                        title="Refreshing..." // iOS
                        titleColor="#fff" // iOS
                      />
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <AppBottomSheet ref={searchSheetRef} height={550}>
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <Text style={tw`text-xl font-bold`}>Search City</Text>
              <TouchableOpacity onPress={() => searchSheetRef.current?.close()}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View
              style={tw`flex-row items-center bg-gray-100 rounded-lg p-3 mb-4`}
            >
              <Search size={20} color="#666" />
              <TextInput
                style={tw`flex-1 ml-2 text-base`}
                placeholderTextColor="#666"
                placeholder="Enter city name..."
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  debouncedSearch(text);
                }}
                autoCapitalize="words"
              />
            </View>

            {/* Search Results */}
            <View style={tw`flex-1`}>
              {searchLoading ? (
                <View style={tw`items-center py-4`}>
                  <ActivityIndicator size="small" color="#666" />
                </View>
              ) : (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item, index) =>
                    `${item.name}-${item.country}-${index}`
                  }
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={tw`flex-row items-center p-3 border-b border-gray-200`}
                      onPress={() => handleLocationSelect(item)}
                    >
                      <MapPin size={20} color="#666" style={tw`mr-3`} />
                      <View>
                        <Text style={tw`text-base font-medium`}>
                          {item.name}
                        </Text>
                        <Text style={tw`text-sm text-gray-600`}>
                          {item.country}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    searchQuery.length > 0 ? (
                      <Text style={tw`text-center text-gray-500 py-4`}>
                        No locations found
                      </Text>
                    ) : (
                      <Text style={tw`text-center text-gray-500 py-4`}>
                        Start typing to search for locations
                      </Text>
                    )
                  }
                />
              )}
            </View>

            {/* Current Location Button */}
            <Button onPress={getCurrentLocationWeather}>
              <View style={tw`flex-row items-center justify-center `}>
                <MapPin size={20} color="#fff" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>
                  Use Current Location
                </Text>
              </View>
            </Button>
          </AppBottomSheet>
          <Text style={tw`text-center text-gray-500 py-4`}>
            Gray Invent Test ©2025
          </Text>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  weatherDetailsCard: {
    borderRadius: 24,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    ...Platform.select({
      ios: {
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      },
      android: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        elevation: 0,
      },
    }),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
});

export default WeatherScreen;
