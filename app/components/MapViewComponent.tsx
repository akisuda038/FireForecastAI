// components/MapViewComponent.tsx
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

// Define the type for the fireData prop
type FireData = {
  location: string;
  latitude: number;
  longitude: number;
  intensity: string;
};

// Accept fireData as a prop and type it explicitly
export default function MapViewComponent({ fireData }: { fireData: FireData[] }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 36.7783, // Default to California
        longitude: -119.4179,
        latitudeDelta: 10,
        longitudeDelta: 10,
      }}>
      {fireData.map((fire, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: fire.latitude,
            longitude: fire.longitude,
          }}
          title={`Fire at ${fire.location}`}
          description={`Intensity: ${fire.intensity}`}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: '100%',
  },
});
