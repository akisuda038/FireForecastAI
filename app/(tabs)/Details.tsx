import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


interface WeatherDetailProps {
  label: string;
  value: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ label, value }) => (
  <View style={styles.pill}>
    <Text style={styles.pillLabel}>{label}</Text>
    <Text style={styles.pillValue}>{value}</Text>
  </View>
);

const WeatherScreen = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.pageTitle}>Weather Safety Details</Text>
    </View>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Text style={styles.location}>Danville, CA</Text>
          <TouchableOpacity>
            <Text style={styles.menu}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weatherMain}>
          <Text style={styles.temperature}>56°</Text>
          <Text style={styles.condition}>Clear Skies</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Weather Details</Text>
        <View style={styles.pillsContainer}>
          <WeatherDetail label="Humidity" value="47%" />
          <WeatherDetail label="Wind" value="8 mph" />
          <WeatherDetail label="Pressure" value="1015 hPa" />
          <WeatherDetail label="UV Index" value="6" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  menu: {
    fontSize: 24,
    color: '#666',
  },
  weatherMain: {
    alignItems: 'center',
    marginVertical: 20,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#1a1a1a',
  },
  condition: {
    fontSize: 24,
    color: '#666',
    marginVertical: 5,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  pill: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  pillLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pillValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
});

export default WeatherScreen;