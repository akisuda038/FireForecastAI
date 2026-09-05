// components/ForecastCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the type for the forecast prop
type ForecastData = {
  riskLevel: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

// Accept the forecast prop with a defined type
export default function ForecastCard({ forecast }: { forecast: ForecastData }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Fire Risk Level: {forecast.riskLevel}</Text>
      <Text>Temperature: {forecast.temperature}°C</Text>
      <Text>Humidity: {forecast.humidity}%</Text>
      <Text>Wind Speed: {forecast.windSpeed} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
