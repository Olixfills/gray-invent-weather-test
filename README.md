# ABWeather 🌦️

A beautiful and intuitive weather application built with React Native and Expo, providing real-time weather forecasts and detailed weather information for locations worldwide.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Olixfills/gray-invent-weather-test/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Olixfills/gray-invent-weather-test.svg?style=social)](https://github.com/Olixfills/gray-invent-weather-test/stargazers)

## Features ✨

- 🌍 Real-time weather data for any location
- 📱 Beautiful and responsive UI with smooth animations
- 📅 5-day weather forecast
- 📍 Search for weather by city name
- 🔄 Pull-to-refresh functionality
- 🌓 Dark/Light mode support
- 📊 Detailed weather metrics (humidity, wind speed, etc.)
- 🚀 Built with Expo and TypeScript

## Screenshots 📸

*Screenshots will be added soon*

## Prerequisites 📋

- Node.js 16+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (for local development)
- [OpenWeatherMap API Key](https://openweathermap.org/api) (free tier is sufficient)

## Installation 🛠️

1. **Clone the repository**
   ```bash
   git clone https://github.com/Olixfills/gray-invent-weather-test.git
   cd gray-invent-weather-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   EXPO_PUBLIC_OPEN_WEATHER_API_KEY=your_api_key_here
   EXPO_PUBLIC_BASE_URL=https://api.openweathermap.org/data/2.5
   EXPO_PUBLIC_GEO_API_URL=https://api.openweathermap.org/geo/1.0/direct
   ```

## Running the App 🚀

### Development

```bash
# Start the development server
npx expo start
```

This will open the Metro bundler. You can then:
- Press `i` to run on iOS Simulator
- Press `a` to run on Android Emulator
- Scan the QR code with Expo Go app on your physical device

### Building for Production

#### Android
```bash
# Build APK
npx expo prebuild
npx expo run:android

# Or build an APK without installing
npx expo build:android -t apk
```

#### iOS
```bash
# Build for iOS
npx expo prebuild
npx expo run:ios

# Or build an IPA
npx expo build:ios
```

## Project Structure 📂

```
ABWeather/
├── app/                  # Main application code
│   ├── _layout.tsx       # Root layout component
│   ├── index.tsx         # Main entry point
│   ├── onboarding.tsx    # Onboarding screens
│   └── weather.tsx       # Main weather screen
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components
│   └── weather/          # Weather-specific components
├── constants/            # Constants and configuration
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## Technologies Used 🛠

- [Expo](https://expo.dev/) - Cross-platform app development
- [React Native](https://reactnative.dev/) - Mobile app framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - Device location
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Expo](https://expo.dev/) for the amazing development experience
- All contributors and users of the app

---

Made with ❤️ by [Olayiwola Abraham Oni](https://github.com/Olixfills) - Feel free to contact me!

[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FOlixfills)](https://twitter.com/Olixfills)
[![GitHub followers](https://img.shields.io/github/followers/Olixfills?style=social)](https://github.com/Olixfills)
