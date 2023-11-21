import { View, Text, StyleSheet, Pressable, Image} from "react-native";


const Reservations = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.textOne}>Current Reservations</Text>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>Reserve</Text>
      </Pressable>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>Reserve</Text>
      </Pressable>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>Reserve</Text>
      </Pressable>
      <Text style={styles.textTwo}>History</Text>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>History</Text>
      </Pressable>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>History</Text>
      </Pressable>
      <Pressable style={styles.parkNow} onPress={() => console.log("Button pressed")}>
        <Text style={styles.buttonText}>History</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#aa",
      alignItems: "center",
      //justifyContent: "center",
    },
    title: {
      fontSize: 40,
      fontWeight: "600",
      color: "white",
    },
    body: {
      fontSize: 24,
      fontWeight: "200",
      color: "white",
    },
    carImage: {
      alignSelf: 'center',
      width: 133.33,
      height: 100,
      resizeMode: 'contain',
      marginTop: 200,
    },
    textNotice: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 56,
    },
    parkNow: {
      backgroundColor: '#4886ff',
      width: 256,
      height: 39,
      borderRadius: 8,
      fontSize: 14,
      alignSelf: 'center',
      marginTop: 30,
      textAlign: 'center'
  },
    textOne: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 150,
  },
    textTwo: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
  },
    buttonText: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: 8,
      color: "white"
  }
  });

export default Reservations;