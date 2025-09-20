import { ForecastList } from "@/types";

export const processForecastData = (
  forecastList: ForecastList[]
): ForecastList[] => {
  const dailyForecasts: { [key: string]: ForecastList } = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    const hour = date.getHours();

    // Prefer entries around midday (12 PM) or the first entry of the day
    if (!dailyForecasts[dayKey] || (hour >= 11 && hour <= 13)) {
      dailyForecasts[dayKey] = item;
    }
  });

  // Convert to array and sort by date, skip today
  return Object.values(dailyForecasts)
    .sort((a, b) => a.dt - b.dt)
    .slice(1, 6); // Skip today, get next 5 days
};

export const formatForecastDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};
