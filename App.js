import React, {useState, useEffect} from 'react';
import { Platform, Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.3817,
    longitude: -97.75645,
    latitudeDelta: 100,
    longitudeDelta: 100});
  
  const userLocation = async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00125,
        longitudeDelta: 0.0025});
      console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);
  
  return (
        <View style={styles.container}>
          <MapView style={styles.map} 
          region = {mapRegion}>
            <Marker coordinate={mapRegion} title ='Marker'/>
          </MapView>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center"
  },
  map: {
    width: '100%',
    height: '100%',
  },
});




