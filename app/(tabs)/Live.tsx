import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mockFires = [
  {
    id: 1,
    latitude: 37.8215,
    longitude: -121.9999,
    title: "Danville Fire",
    description: "Small brush fire (contained)"
  },
  {
    id: 2,
    latitude: 37.8300,
    longitude: -122.0100,
    title: "Mt. Diablo Fire (current)",
    description: "Mountain brush fire"
  },
  {
    id: 3,
    latitude: 37.8150,
    longitude: -121.9850,
    title: "San Ramon Fire",
    description: "Grass fire (non-threatening)"
  },
  {
    id: 4,
    latitude: 37.8320,
    longitude: -122.0050,
    title: "Blackhawk Fire",
    description: "Small wildfire (non-threatening)"
  }
];

export default function MapScreen() {
  const initialRegion = {
    latitude: 37.8215,    // Danville coordinates
    longitude: -121.9999,
    latitudeDelta: 0.0922, // Closer zoom
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={initialRegion}
      >
        {mockFires.map((fire) => (
          <Marker
            key={fire.id}
            coordinate={{
              latitude: fire.latitude,
              longitude: fire.longitude
            }}
            title={fire.title}
            description={fire.description}
          >
            <MaterialCommunityIcons 
              name="fire" 
              size={24}  // Smaller icon size
              color="#FF4136" 
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});