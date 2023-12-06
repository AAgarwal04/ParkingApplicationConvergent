import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Active = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate("Park");
  };
  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/images/icon-car.png')} style={styles.carImage}/> */}
      <FontAwesome5 name="car" size={150} color="#4886FF" />
      <Text style={styles.textNotice}>
        You Don't Have Any Active Parking Sessions Right Now
      </Text>
      <TouchableOpacity style={styles.parkButton} onPress={handlePress}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Park Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: {
    alignSelf: "center",
    width: 133.33,
    height: 100,
    resizeMode: "contain",
    marginTop: 200,
  },
  textNotice: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 56,
    width: "85%",
  },
  parkNow: {
    backgroundColor: "#4886ff",
    width: 256,
    height: 39,
    borderRadius: 8,
    fontSize: 14,
    alignSelf: "center",
    marginTop: 105,
    textAlign: "center",
  },
  parkButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4886ff",
    width: "65%",
    height: 40,
    borderRadius: 10,
    margin: "15%",
  },
});

export default Active;
