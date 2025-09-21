# ABWeather 🌦️

A beautiful and intuitive weather application built with React Native, Expo, and TypeScript, providing real-time weather forecasts and detailed weather information for locations worldwide.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Olixfills/gray-invent-weather-test/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Olixfills/gray-invent-weather-test.svg?style=social)](https://github.com/Olixfills/gray-invent-weather-test/stargazers)

## Features ✨

- 🌍 Real-time weather data for any location
- 📱 Beautiful and responsive UI with smooth animations
- 📅 5-day weather forecast
- 📍 Search for weather by city name
- 🔄 Pull-to-refresh functionality
- 📊 Detailed weather metrics (humidity, wind speed, feels like, etc.)
- 🚀 Built with Expo, TypeScript, and React Native Reanimated
- 📱 Cross-platform (iOS & Android)
- 🎨 Beautifully designed UI components

## Screenshots 📸

*Screenshots will be added soon*

## Prerequisites 📋

- Node.js 16+ and npm/yarn/pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator, Android Emulator, or physical device with Expo Go
- [OpenWeatherMap API Key](https://openweathermap.org/api) (free tier is sufficient)

## Installation 🛠️

1. **Clone the repository**
   ```bash
   git clone https://github.com/Olixfills/gray-invent-weather-test.git
   cd gray-invent-weather-test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
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

1. **Start the development server**
   ```bash
   pnpm start
   # or
   npm start
   # or
   yarn start
   ```

2. **Run on iOS/Android**
   - Press `i` for iOS or `a` for Android in the terminal
   - Or scan the QR code with your device's camera (Expo Go app required)

## Project Structure 🏗️

```
ABWeather/
├── app/                  # App screens and navigation
│   ├── _layout.tsx       # Root layout component
│   ├── index.tsx         # Main entry point
│   ├── onboarding.tsx    # Onboarding screens
│   └── weather.tsx       # Main weather screen
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components
│   └── ui/               # Styled UI components
├── constants/            # App constants and theme
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## Technologies Used 🛠

- [Expo](https://expo.dev/) - React Native framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - Device location
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Smooth animations
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) - Device location services
- [Expo Font](https://docs.expo.dev/versions/latest/sdk/font/) - Custom fonts
- [Expo Status Bar](https://docs.expo.dev/versions/latest/sdk/status-bar/) - Status bar customization

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
