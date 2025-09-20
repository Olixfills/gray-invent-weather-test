import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  CalendarCheck,
  CloudMoonRain,
  Sunrise,
} from "lucide-react-native";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to ABWeather",
    description:
      "Get accurate weather forecasts for your location and plan your day accordingly.",
    image: <CloudMoonRain size={300} color="#fff" />,
  },
  {
    id: "2",
    title: "Real-time Updates",
    description:
      "Receive real-time weather updates and severe weather alerts to stay prepared.",
    image: <Sunrise size={300} color="#fff" />,
  },
  {
    id: "3",
    title: "Plan Your Week",
    description:
      "View 7-day forecasts and plan your activities with confidence.",
    image: <CalendarCheck size={300} color="#fff" />,
  },
];

type OnboardingProps = {
  onFinish: () => void;
};

const Onboarding = ({ onFinish }: OnboardingProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const router = useRouter();
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      // Scroll to next item
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentIndex(index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.gradient}
      >
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <Animated.FlatList
            ref={flatListRef}
            data={slides}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>{item.image}</View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            scrollEnabled
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: scrollOffset,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
            snapToInterval={width}
            decelerationRate="fast"
            snapToAlignment="start"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            initialScrollIndex={0}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.description}>{currentSlide.description}</Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <ArrowRight size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  skipButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  skipText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
  },
  imageContainer: {
    width: width,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#4c669f",
    width: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: "#4c669f",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Onboarding;
