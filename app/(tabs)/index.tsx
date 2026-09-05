import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const mockFires = [
  {
    id: 1,
    latitude: 37.8215,
    longitude: -121.9999,
    title: "Danville Fire",
    distance: "0.5 mi",
    risk: "High",
    severity: "7/10"
  },
  {
    id: 2,
    latitude: 37.8300,
    longitude: -122.0100,
    title: "Mt. Diablo Fire",
    distance: "2.3 mi",
    risk: "Critical",
    severity: "9/10"
  }
];

const weatherDetails = [
  { id: 1, label: "Temperature", value: "53°", icon: "thermometer" },
  { id: 2, label: "Humidity", value: "47%", icon: "water-percent" },
  { id: 3, label: "Wind", value: "8 mph", icon: "weather-windy" },
  { id: 4, label: "Pressure", value: "1015 hPa", icon: "gauge" }
];

export default function HomeScreen() {
  const initialRegion = {
    latitude: 37.8215,
    longitude: -121.9999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.mapCard}
        onPress={() => router.push({ pathname: '/(tabs)/Live' })}
      >
        <MapView 
          style={styles.miniMap}
          initialRegion={initialRegion}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          {mockFires.map((fire) => (
            <Marker
              key={fire.id}
              coordinate={{
                latitude: fire.latitude,
                longitude: fire.longitude
              }}
            >
              <MaterialCommunityIcons name="fire" size={24} color="#FF4136" />
            </Marker>
          ))}
        </MapView>
        <View style={styles.cardTitle}>
          <Text style={styles.titleText}>Danville, CA - click to view more</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Fires Near You</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.firesList}
      >
        {mockFires.map((fire) => (
          <View key={fire.id} style={styles.fireCard}>
            <Text style={styles.fireName}>{fire.title}</Text>
            <View style={styles.fireStats}>
              <Text style={styles.statText}>Distance: {fire.distance}</Text>
              <Text style={styles.statText}>Risk: {fire.risk}</Text>
              <Text style={styles.statText}>Severity: {fire.severity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => router.push({ pathname: '/(tabs)/Live' })}
            >
              <Text style={styles.viewButtonText}>View Fire</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Weather Saftey Details</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.forecastList}
      >
        {weatherDetails.map((detail) => (
          <TouchableOpacity 
            key={detail.id} 
            style={styles.detailCard}
            onPress={() => router.push({ pathname: '/(tabs)/Details' })}
          >
            <MaterialCommunityIcons 
              key={detail.icon}
              size={32} 
              color="#66" 
              style={styles.detailIcon}
            />
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapCard: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  miniMap: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  firesList: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  fireCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fireName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  fireStats: {
    marginBottom: 16,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  viewButton: {
    backgroundColor: '#FF4136',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  forecastList: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  weatherCard: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsList: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  detailCard: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailIcon: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  homeImage: {
    width: Dimensions.get('window').width,
    height: 800,
    resizeMode: 'cover',
  }
});