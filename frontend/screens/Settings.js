import { View, Text, StyleSheet, Button, Pressable } from "react-native";

const Settings = () => {
    return (
        <><View style={styles.button1}>
            <Button
                title="Press Me"
                onPress />
        </View>
        <View style={styles.button2}>
            <Button
                title="Press Me"
                onPress />
        </View>
        <View style = {styles.button3}>
            <Button
                title = "Press Me"
                onPress
            />
        </View>
        <View style = {styles.button4}>
            <Button
                title = "Press Me"
            /></>
)};
    
const styles = StyleSheet.create({

});

export default Settings;