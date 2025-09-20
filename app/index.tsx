import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Onboarding from "./onboarding";
import WeatherScreen from "./weather";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // I check if it's the first launch
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        setIsFirstLaunch(hasLaunched === null);
      } catch (e) {
        console.warn("Failed to load app data", e);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleOnboardingFinish = async () => {
    try {
      await AsyncStorage.setItem("hasLaunched", "true");
      setIsFirstLaunch(false);
    } catch (error) {
      console.error("Error saving onboarding status", error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      {isFirstLaunch ? (
        <Onboarding onFinish={handleOnboardingFinish} />
      ) : (
        <WeatherScreen />
      )}
    </View>
  );
}
