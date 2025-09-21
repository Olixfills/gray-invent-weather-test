import * as Location from "expo-location";
import { Alert, Platform, PermissionsAndroid } from "react-native";

type PermissionStatus = "granted" | "denied" | "undetermined";

export interface LocationPermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
  granted: boolean;
  expires: "never" | number;
  android?: {
    accuracy: "fine" | "coarse" | "none";
  };
  ios?: {
    scope: "whenInUse" | "always" | "none";
  };
}

/**
 * Requests location permissions with platform-specific handling
 * @returns Promise that resolves to a LocationPermissionResult
 */
export const requestLocationPermission =
  async (): Promise<LocationPermissionResult> => {
    if (Platform.OS === "android") {
      return handleAndroidLocationPermission();
    } else {
      return handleIOSLocationPermission();
    }
  };

/**
 * Handles Android location permission request
 */

const handleAndroidLocationPermission =
  async (): Promise<LocationPermissionResult> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission Required",
          message:
            "This app needs access to your location to show weather information. Please enable it.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      const status =
        granted === PermissionsAndroid.RESULTS.GRANTED ? "granted" : "denied";
      const canAskAgain =
        granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ? false : true;
      const expires = "never";

      return {
        status,
        canAskAgain,
        granted,
        expires,
        android: {
          accuracy: "fine",
        },
      };
    } catch (error) {
      console.error("Error requesting Android location permission:", error);
      throw error;
    }
  };

/**
 * Handles iOS location permission request
 */
const handleIOSLocationPermission =
  async (): Promise<LocationPermissionResult> => {
    try {
      const { status, canAskAgain, granted, expires, ios } =
        await Location.requestForegroundPermissionsAsync({
          accuracy: Location.Accuracy.High,
        });

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "This app needs access to your location to show weather information. Please enable location access in your device settings.",
          [
            {
              text: "Not Now",
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => {
                // This will open the app's settings screen
                Location.enableNetworkProviderAsync().catch(() => {
                  // Handle error if needed
                });
              },
            },
          ]
        );
      }

      return {
        status,
        canAskAgain,
        granted,
        expires,
        ios: {
          scope: ios?.scope || "none",
        },
      };
    } catch (error) {
      console.error("Error requesting iOS location permission:", error);
      throw error;
    }
  };

/**
 * Checks if location services are enabled on the device
 */
export const checkLocationEnabled = async (): Promise<boolean> => {
  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) {
    Alert.alert(
      "Location Services Disabled",
      "Please enable location services to use this feature.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => {
            if (Platform.OS === "ios") {
              // On iOS, we can't directly open settings, but we can prompt the user
              Location.enableNetworkProviderAsync().catch(() => {
                // Handle error if needed
              });
            } else {
              // On Android, we can open location settings directly
              Location.enableNetworkProviderAsync().catch(() => {
                // Handle error if needed
              });
            }
          },
        },
      ]
    );
    return false;
  }
  return true;
};
