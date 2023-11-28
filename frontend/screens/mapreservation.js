import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList} from "react-native";
import CheckboxComponent from './checkbox';


const mapreservation = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: '1', label: 'Item 1', isChecked: true },
    { id: '2', label: 'Item 2', isChecked: false },
    { id: '3', label: 'Item 3', isChecked: false },
    { id: '4', label: 'Item 4', isChecked: false },
    // Add more checkboxes as needed
  ]);

  const toggleCheckbox = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, isChecked: !checkbox.isChecked }
          : checkbox
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Row layout for images */}
      <View style={styles.rowContainer}>
        <Image
          style={styles.parkUp}
          source={require("../assets/garageparkingpot.png")}
        />
        <Image
          style={styles.parkUpTwo}
          source={require("../assets/parkinggarage.png")}
        />
      </View>

      {/* Column layout for checkboxes */}
      <View style={styles.columnContainer}>
        <CheckboxComponent
          label="Large Vehicle Size"
          isChecked={checkboxes[0].isChecked}
          onPress={() => toggleCheckbox(checkboxes[0].id)}
        />
        <CheckboxComponent
          label="Disability Parking"
          isChecked={checkboxes[1].isChecked}
          onPress={() => toggleCheckbox(checkboxes[1].id)}
        />
        <CheckboxComponent
          label="EV Charging"
          isChecked={checkboxes[2].isChecked}
          onPress={() => toggleCheckbox(checkboxes[2].id)}
        />
        <CheckboxComponent
          label="Gated Parking"
          isChecked={checkboxes[3].isChecked}
          onPress={() => toggleCheckbox(checkboxes[3].id)}
        />
        {/* Add more checkboxes as needed */}
      </View>

      {/* Column layout for text and button */}
      <Text style={styles.textOne}>Location: 600 W 26th St 78705 Austin Texas</Text>
      <Text style={styles.textOne}>Instructions will be given once booked</Text>
      <Text style={styles.textThree}>November 17th 2023 to November 18th 2023</Text>
      <Text style={styles.textFour}>$14 a day</Text>
      <Text style={styles.textThree}>Total: $33 (inclusive of taxes and fees)</Text>
      <Pressable
        style={styles.parkNow}
        onPress={() => console.log("Button pressed")}
      >
        <Text style={styles.buttonText}>Book</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Change the background color to something lighter
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  parkUp: {
    marginTop: 10,
    width: 150,
    height: 150,
    marginRight: 20,
  },
  parkUpTwo: {
    marginTop: 10,
    width: 150,
    height: 150,
    marginLeft: 20,
  },
  parkNow: {
    backgroundColor: '#4886ff',
    width: 256,
    height: 39,
    borderRadius: 8,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 30,
    textAlign: 'center',
  },
  textOne: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 30, // Adjusted marginTop
  },
  textThree: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40, // Adjusted marginTop
    color: "blue",
  },
  textFour: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 40, // Adjusted marginTop
    color: "blue",
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    color: "white",
  },
});

export default mapreservation;
