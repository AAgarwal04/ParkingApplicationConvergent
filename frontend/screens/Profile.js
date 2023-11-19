import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import ImageUploader from "../ImageUploader";

const Profile = () => {
    return (
        <View className = "Profile" style = {styles.container}>
            <View style={styles.imageUploader}>
                <ImageUploader/>
            </View>
            <Button 
                title = "Button 1"
                color = "#ffffff"
            />
            <Button 
                title = "Button 2"
                color = "#ffffff"
            />
            <Button 
                title = "Button 3"
                color = "#ffffff"
            />
            <Button 
                title = "Button 4"
                color = "#ffffff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#4886ff",
      alignItems: "center",
      justifyContent: "center",
    },
    imageUploader: {

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
  });

export default Profile;