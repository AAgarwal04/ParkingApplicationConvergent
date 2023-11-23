import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { FAB, Title } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  MapMarker,
} from "react-native-maps";
import * as Location from "expo-location";
import MarkerIcon from "../assets/map_marker.png";

const Homepage = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.3817,
    longitude: -97.75645,
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  const [searchText, setSearchText] = useState("");

  //Feel free to add more markers. Go to https://www.latlong.net/ to find the appropriate latitude and longitutde.
  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 30.292416, longitude: -97.745343 },
      info: "2 Spots Open\nGated\nApartment Building\nCovered",
    },
    {
      id: 2,
      coordinate: { latitude: 30.292093, longitude: -97.745376 },
      info: "2 Spots Open\nUngated\nOutdoors",
    },
    {
      id: 3,
      coordinate: { latitude: 30.280887, longitude: -97.736359 },
      info: "4 Spots Open\nGated\nMultilevel Garage",
    },
    {
      id: 4,
      coordinate: { latitude: 30.284303, longitude: -97.743254 },
      info: "3 Spots Open\nGated\nApartment Building\nCovered",
    },

    // Add more markers as needed
  ]);
  const pinColor = "#4886FF";

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5", // Light gray background
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161", // Dark gray text
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5", // Light gray text stroke
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off", // Hide all POIs by default
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [
        {
          visibility: "on", // Make parks visible
          color: "#728d76", // Customize the color for major parks
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff", // White for roads
          weight: 1.5,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575", // Dark gray for road labels
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575", // Dark gray for arterial road labels
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada", // Light gray for highways
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161", // Dark gray for highway labels
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "on", // Show labels for local roads
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575", // Dark gray for local road labels
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5", // Light gray for transit lines
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee", // Light gray for transit stations
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#6d8592", // Bluish gray for water
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e", // Dark gray for water labels
        },
      ],
    },
  ];

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.005,
    });
    // console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  const handleSearch = async () => {
    try {
      if (!searchText.trim()) {
        // Don't perform a search if the search text is empty or contains only spaces
        return;
      }

      const result = await Location.geocodeAsync(searchText);

      if (result && result.length > 0) {
        const { latitude, longitude } = result[0];
        setMapRegion((prevRegion) => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
      } else {
        console.warn("No matching location found.");
        // You might want to show a user-friendly message here or handle it in another way
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <View className="Homepage" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search for a location"
          onChangeText={(text) => setSearchText(text)}
          onEndEditing={() => handleSearch(searchText)}
          value={searchText}
        />

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          region={mapRegion}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              //image={MarkerIcon}
              // style={styles.markerIcon}
            >
              <Callout>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ textAlign: "center" }}>{marker.info}</Text>
                </View>
              </Callout>
              <Image
                source={MarkerIcon}
                style={styles.markerIcon}
              />
            </Marker>
          ))}
        </MapView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerIcon: {
    width: 30,
    height: 40,
  },
});

export default Homepage;
