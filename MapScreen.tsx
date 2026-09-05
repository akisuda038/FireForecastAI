// /app/MapScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const MapScreen = () => {
  const { latitude, longitude, name } = useLocalSearchParams();
  const [mapRegion, setMapRegion] = useState({
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Reset map region when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setMapRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }, [latitude, longitude])
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={mapRegion}
      >
        <Marker
          coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
          title={name}
        />
      </MapView>
      <View style={styles.mapInfoContainer}>
        <Text style={styles.mapTitle}>{name}</Text>
        {/* Add additional fire information as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapScreen;
