import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import MarkerIcon from "../assets/map_marker.png";
import Geocoder from "react-native-geocoding";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import { Calendar, LocaleConfig } from "react-native-calendars";
Geocoder.init("");
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

const Homepage = ({ navigation }) => {
  // Additional filter stuff
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Disability Parking", value: "dp" },
    { label: "EV Charging", value: "ev" },
    { label: "Large Vehichle Size", value: "lv" },
  ]);

  // Price slider stuff
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  // Calendar Stuff
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    const newSelectedDates = { ...selectedDates };

    // Toggle selected date
    if (newSelectedDates[day.dateString]) {
      delete newSelectedDates[day.dateString]; // remove if already selected
    } else {
      newSelectedDates[day.dateString] = {
        selected: true,
        marked: true,
        selectedColor: "#4886FF",
      };
    }
    setSelectedDates(newSelectedDates);
  };

  // Filter Modal stuff
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  // Map Stuff
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
      info: "4 Spots Open\nGated\nMulti-Level Parking Garage\nCovered",
    },
    {
      id: 4,
      coordinate: { latitude: 30.284303, longitude: -97.743254 },
      info: "3 Spots Open\nGated\nApartment Building\nCovered",
    },
    //Castillian
    {
      id: 5,
      coordinate: { latitude: 30.2873, longitude: -97.742439 },
      info: "5 Spots Open\nGated\nApartment Building\nCovered",
    },
    //Crest
    {
      id: 6,
      coordinate: { latitude: 30.28331, longitude: -97.74644 },
      info: "4 Spots Open\nGated\nApartment Building\nCovered",
    },
    //Callaway
    {
      id: 7,
      coordinate: { latitude: 30.28474, longitude: -97.74367 },
      info: "6 Spots Open\nGated\nApartment Building\nCovered",
    },
    //26 West
    {
      id: 8,
      coordinate: { latitude: 30.291109, longitude: -97.743462 },
      info: "4 Spots Open\nGated\nApartment Building\nCovered",
    },
    //The Block 25th
    {
      id: 9,
      coordinate: { latitude: 30.28958, longitude: -97.745159 },
      info: "1 Spot Open\nGated\nApartment Building\nCovered",
    },
    //The Block 23rd
    {
      id: 10,
      coordinate: { latitude: 30.28701, longitude: -97.7465774 },
      info: "1 Spot Open\nGated\nApartment Building\nCovered",
    },
    //The Block 28th
    {
      id: 11,
      coordinate: { latitude: 30.293277, longitude: -97.744633 },
      info: "6 Spots Open\nGated\nApartment Building\nCovered",
    },
    //The Block Leon
    {
      id: 12,
      coordinate: { latitude: 30.2904735, longitude: -97.7497522 },
      info: "10 Spots Open\nGated\nApartment Building\nCovered",
    },
    //Sig 1909
    {
      id: 13,
      coordinate: { latitude: 30.2836878, longitude: -97.7447841 },
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

      //const result = await Location.geocodeAsync(searchText);
      const result = await Geocoder.from(searchText);

      if (result) {
        //const { latitude, longitude } = result[0];
        const latitude = result.results[0].geometry.location.lat;
        const longitude = result.results[0].geometry.location.lng;
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

  const handleSpot = () => {
    navigation.replace("Spot");
  };

  return (
    <View className="Homepage" style={styles.container}>
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
            tappable={true}
            onPress={handleSpot}
          >
            {/* <Callout>
              <View style={{ alignItems: "center" }}>
                <Text style={{ textAlign: "center" }}>{marker.info}</Text>
              </View>
            </Callout> */}
            <Image source={MarkerIcon} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search for a location"
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
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 5,
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

      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={toggleFilterModal}
        swipeDirection={["down"]}
        onSwipeComplete={toggleFilterModal}
      >
        <View style={styles.filterModal}>
          <Text
            style={{
              color: "#4886FF",
              marginTop: "5%",
              marginRight: "70%",
              fontWeight: "bold",
            }}
          >
            Filter by
          </Text>
          <TouchableOpacity
            onPress={() => setCalendarVisible(!isCalendarVisible)}
            style={styles.dateButton}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#4886FF",
                  fontWeight: "bold",
                  paddingRight: 230,
                }}
              >
                Date
              </Text>
              <Feather name="calendar" size={20} color="#4886FF" />
            </View>
          </TouchableOpacity>
          {isCalendarVisible && (
            <Calendar
              onDayPress={handleDayPress}
              markedDates={selectedDates}
              theme={{
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#4886FF",
                arrowColor: "#4886FF",
              }}
            />
          )}
          <Text
            style={{
              color: "#4886FF",
              marginTop: "5%",
              marginRight: "63%",
              fontWeight: "bold",
            }}
          >
            Price Range
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#4886FF", fontWeight: "bold", marginRight: 10 }}
            >
              Min
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#4886FF"
              maximumTrackTintColor="#D9D9D9"
              value={minPrice}
              onValueChange={(value) => {
                setMinPrice(value);
              }}
            />
            <Text
              style={{ color: "#4886FF", fontWeight: "bold", marginLeft: 10 }}
            >
              {minPrice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#4886FF", fontWeight: "bold", marginRight: 10 }}
            >
              Max
            </Text>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#4886FF"
              maximumTrackTintColor="#D9D9D9"
              value={maxPrice}
              onValueChange={(value) => {
                setMaxPrice(value);
              }}
            />
            <Text
              style={{ color: "#4886FF", fontWeight: "bold", marginLeft: 10 }}
            >
              {maxPrice}
            </Text>
          </View>
          <Text
            style={{
              color: "#4886FF",
              fontWeight: "bold",
              marginTop: "5%",
              marginBottom: 10,
              marginRight: "53%",
            }}
          >
            Additional Filters
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            multiple={true}
            min={0}
            max={items.length}
            containerStyle={{
              backgroundColor: "#F9F9F9",
              width: "85%",
            }}
            style={{
              backgroundColor: "#F9F9F9",
              borderColor: "#818181",
              borderWidth: 1,
            }}
            textStyle={{ color: "#4886FF" }}
            dropDownContainerStyle={{
              backgroundColor: "#F9F9F9",
              borderColor: "#818181",
              borderWidth: 1,
            }}
            placeholderStyle={{ color: "#4886FF" }}
            mode="BADGE"
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          {/* Apply button */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Button to toggle the filter modal */}
      <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
        <Text style={{ color: "white" }}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchBar: {
    zIndex: 1,
    position: "absolute",
    marginTop: 40,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerIcon: {
    width: 30,
    height: 40,
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    marginTop: 700,
    backgroundColor: "#4886ff",
    width: "25%",
    borderRadius: 10,
    padding: "5%",
  },
  filterModal: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 10,
  },
  applyButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4886ff",
    width: "85%",
    height: 30,
    borderRadius: 10,
    margin: "5%",
  },
  dateButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    borderColor: "#818181",
    borderWidth: 1,
    width: "85%",
    height: 30,
    borderRadius: 10,
    marginTop: "5%",
  },
});

export default Homepage;
