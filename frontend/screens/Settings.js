import { View, Text, StyleSheet, Button, Pressable } from "react-native";

const Settings = () => {
    return (
        <View>
            <Button 
                title = "Button 1"
                color = "#f194ff"
                onPress={() => Alert.alert('Button1 pressed')}
            />
            <Button 
                title = "Button 2"
                color = "#f194ff"
                onPress={() => Alert.alert('Button2 pressed')}
            />
            <Button 
                title = "Button 3"
                color = "#f194ff"
                onPress={() => Alert.alert('Button3 pressed')}
            />
            <Button 
                title = "Button 4"
                color = "#f194ff"
                onPress={() => Alert.alert('Button4 pressed')}
            />
        </View>
    );
}
 


const styles = StyleSheet.create({

});

export default Settings;