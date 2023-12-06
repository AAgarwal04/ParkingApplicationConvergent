import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
//import ImageUploader from "../ImageUploader";

const Profile = () => {
  return (
    <View className="Profile" style={styles.container}>
      <View style={styles.imageUploader}>
        <Image
          source={require("../assets/king_tut_pfp.jpg")}
          style={styles.pfp}
        />
        {/* <ImageUploader /> */}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Personal Information</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Payments and Payouts</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Login and Security</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Your Listings</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Get Help with a Safety Issue</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>
            Terms of Service and Privacy Policy
          </Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Visit the Help Center</Text>
        </Pressable>
        <Pressable style={styles.buttons}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FaFc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageUploader: {
    marginTop: 59,
  },
  pfp: {
    width: 141,
    height: 141,
    borderRadius: 70,
  },
  buttonContainer: {
    marginTop: 18,
  },
  buttons: {
    backgroundColor: "white",
    width: 352,
    height: 48,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 12,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "left",
    marginBottom: 23,
    paddingLeft: 11,
  },
  buttonText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default Profile;
