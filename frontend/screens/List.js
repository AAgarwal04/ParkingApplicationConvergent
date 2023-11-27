import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import MarkerIcon from "../assets/map_marker.png";
import Geocoder from "react-native-geocoding";
Geocoder.init("");

const Step1 = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          style={styles.profileImage}
          source={require("../assets/profile_pic.png")}
        />
        <Text style={styles.profileName}>Lionel Messi</Text>
        <TouchableOpacity style={styles.setupButton} onPress={onNext}>
          <Image
            style={styles.parkUp}
            source={require("../assets/park_up.png")}
          />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 0 }}>
            Parkup Setup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Step2 = ({ onNext }) => {
  // Map Stuff
  const [mapRegion, setMapRegion] = useState({
    latitude: 30.3817,
    longitude: -97.75645,
    latitudeDelta: 100,
    longitudeDelta: 100,
  });

  const [searchText, setSearchText] = useState("");
  const [markers, setMarkers] = useState([]);

  const pinColor = "#4886FF";
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

      //const result = await Location.geocodeAsync(searchText);
      const result = await Geocoder.from(searchText);

      if (result) {
        //const { latitude, longitude } = result[0];
        const lat = result.results[0].geometry.location.lat;
        const long = result.results[0].geometry.location.lng;
        setMapRegion((prevRegion) => ({
          ...prevRegion,
          lat,
          long,
        }));
        setMarkers([
          {
            id: 1,
            coordinate: { latitude: lat, longitude: long },
          },
        ]);
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
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        //customMapStyle={mapStyle}
        region={mapRegion}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
          >
            <Callout>
              <View style={{ alignItems: "center" }}>
                <Text style={{ textAlign: "center" }}>{marker.info}</Text>
              </View>
            </Callout>
            <Image source={MarkerIcon} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Where's your spot located?"
          onChangeText={(text) => setSearchText(text)}
          onEndEditing={() => handleSearch(searchText)}
          value={searchText}
          platform="default"
          round
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            borderRadius: 20,
            flexDirection: "row-reverse",
          }}
          inputContainerStyle={{ backgroundColor: "white" }}
          placeholderTextColor={"#A7A8A9"}
          searchIcon={{
            size: 24,
            color: "#4886FF",
            containerStyle: {
              marginLeft: 10,
            },
          }}
        />
      </View>
    </View>
  );
};

const List = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  // Render the appropriate step based on the current step state
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} />;
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  return <View>{renderStep()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFC",
  },
  profileBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#B3B3B3",
    alignItems: "center",
    width: "85%",
    //height:"30%",
    margin: "55%",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70, // Half of the width/height to make it a circle
    marginBottom: 10,
    marginTop: "10%",
  },
  profileName: {
    fontWeight: "bold",
  },
  setupButton: {
    flexDirection: "row ",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4886ff",
    width: "85%",
    height: 40,
    borderRadius: 10,
    marginTop: "20%",
    marginBottom: "10%",
  },
  parkUp: {
    width: 14,
    height: 17,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    zIndex: 1,
    position: "absolute",
    marginTop: "10%",
    alignItems: "center",
  },
});

export default List;
