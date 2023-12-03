import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
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

const Step2 = ({ onNext, onBack }) => {
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
    <View style={{ alignItems: "center" }}>
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
            <Image source={MarkerIcon} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#4886ff" />
        </TouchableOpacity>
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
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step3 = ({ onNext, onBack }) => {
  return (
    <View style={styles.threeContainer}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: "10%",
          height: 40,
          borderRadius: 10,
          marginTop: "10%",
          marginRight: "85%",
        }}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={24} color="#4886ff" />
      </TouchableOpacity>
      <Image
        style={{ marginTop: 10 }}
        source={require("../assets/setup.png")}
      />
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "10%",
          backgroundColor: "#4886ff",
          width: "25%",
          height: 40,
          borderRadius: 10,
        }}
        onPress={onNext}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step4 = ({ onNext, onBack }) => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#F9FAFC",
        height: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: "10%",
          height: 40,
          borderRadius: 10,
          marginTop: "10%",
          marginRight: "85%",
        }}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={24} color="#4886ff" />
      </TouchableOpacity>
      <Text style={styles.title}>Provide an Official ID</Text>
      <TouchableOpacity style={styles.idButton}>
        <Text style={styles.buttonText}>Government ID</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "10%",
          backgroundColor: "#4886ff",
          width: "25%",
          height: 40,
          borderRadius: 10,
        }}
        onPress={onNext}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step5 = ({ back }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFC",
        height: "100%",
      }}
    >
      <FontAwesome5 name="check-circle" size={150} color="#4886FF" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: "15%",
          marginBottom: "10%",
        }}
      >
        All Done!
      </Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          margin: "10%",
          backgroundColor: "#4886ff",
          width: "25%",
          height: 40,
          borderRadius: 10,
        }}
        onPress={back}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Return</Text>
      </TouchableOpacity>
    </View>
  );
};

const List = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const returnBack = () => {
    setCurrentStep(1);
  };

  // Render the appropriate step based on the current step state
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />;
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5 back={returnBack} />;
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
    //marginTop: "0%",
    alignItems: "center",
  },
  next: {
    zIndex: 1,
    alignItems: "center",
    position: "absolute",
    paddingTop: 100,
  },
  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    marginTop: 680,
    backgroundColor: "#4886ff",
    width: "25%",
    height: 40,
    borderRadius: 10,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: "10%",
    height: 40,
    borderRadius: 10,
    marginTop: "10%",
    marginRight: "85%",
  },
  threeContainer: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "30%",
    marginBottom: "40%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  idButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4886FF",
    width: "75%",
    height: 40,
    borderRadius: 10,
    marginBottom: 220,
  },
});

export default List;
