import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

export default function WeatherConditions() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.04&appid=c9da0d2496c4bd591312622375dbc3a0')
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Failed to load weather data</Text>;
  }

  const { main, wind } = weatherData;

  // Convert temperature from Kelvin to Fahrenheit
  const temperatureFahrenheit = ((main.temp - 273.15) * 9/5 + 32).toFixed(1);

  // Sample FDI calculation (this is just an example, replace with actual calculation)
  const calculateFDI = () => {
    const temperature = main.temp - 273.15; // Convert Kelvin to Celsius
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    // This is a placeholder formula for FDI, replace with a real one if available
    const fdi = ((temperature * 1.2) + (windSpeed * 0.8)) / (humidity * 0.5);
    return fdi.toFixed(2);
  };

  const fireDangerIndex = calculateFDI();

  // Determine the quality of temperature, wind speed, and FDI
  const determineQuality = (value, type) => {
    if (type === 'temperature') {
      // High temperature is bad
      return value < 60 ? 'Good' : value < 85 ? 'Moderate' : 'High';
    } else if (type === 'windSpeed' || type === 'FDI') {
      return value < 30 ? 'Good' : value < 70 ? 'Moderate' : 'High';
    } else if (type === 'humidity') {
      // High humidity is good, low is bad
      return value > 70 ? 'Good' : value > 30 ? 'Moderate' : 'Low';
    }
  };

  // Determine color based on quality
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Good':
        return '#00A170';
      case 'Moderate':
        return '#FFA500'; // Orange
      case 'High':
      case 'Low':
        return '#FF5733'; // Red
      default:
        return '#444';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Safety</Text>
      <Text style={styles.subtitle}>Currently displaying weather and fire danger index</Text>
      <Text style={styles.subtitle}>
        High temperatures can increase the likelihood of fires by lowering moisture content in the environment.
      </Text>
      <Text style={styles.subtitle}>
        High humidity helps reduce fire risks, while low humidity can increase the chance of ignition.
      </Text>
      <Text style={styles.subtitle}>
        Higher wind speeds can greatly increase fire spread and intensity.
      </Text>
      <Text style={styles.subtitle}>
          The Fire Danger Index (FDI) indicates the potential risk for fires to start and spread. A higher value means higher risk.
      </Text>
      
      {/* Weather and FDI Card */}
      <View style={styles.card}>
        <Text style={styles.date}>Today</Text>

        {/* Weather Information */}
        <View style={styles.infoRow}>
          <Text style={styles.parameter}>Temperature</Text>
          <Text style={styles.value}>{temperatureFahrenheit} °F</Text>
          <Text style={[styles.quality, { color: getQualityColor(determineQuality(temperatureFahrenheit, 'temperature')) }]}>
            {determineQuality(temperatureFahrenheit, 'temperature')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.parameter}>Humidity</Text>
          <Text style={styles.value}>{main.humidity} %</Text>
          <Text style={[styles.quality, { color: getQualityColor(determineQuality(main.humidity, 'humidity')) }]}>
            {determineQuality(main.humidity, 'humidity')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.parameter}>Wind Speed</Text>
          <Text style={styles.value}>{wind.speed} m/s</Text>
          <Text style={[styles.quality, { color: getQualityColor(determineQuality(wind.speed, 'windSpeed')) }]}>
            {determineQuality(wind.speed, 'windSpeed')}
          </Text>
        </View>

        {/* Fire Danger Index */}
        <View style={styles.infoRow}>
          <Text style={styles.parameter}>Fire Danger Index</Text>
          <Text style={styles.fireValue}>{fireDangerIndex}</Text>
          <Text style={[styles.quality, { color: getQualityColor(determineQuality(fireDangerIndex, 'FDI')) }]}>
            {determineQuality(fireDangerIndex, 'FDI')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b261c',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    paddingHorizontal: 5
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 4,
    width: 350, 
    alignSelf: 'center'
  },
  date: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  parameter: {
    fontSize: 18,
    color: '#333',
    flex: 2,
  },
  value: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    textAlign: 'right'
  },
  fireValue: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    marginTop: 3
  },
  quality: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});
