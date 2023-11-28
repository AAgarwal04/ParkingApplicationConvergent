import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";

const Active = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/icon-car.png')} style={styles.carImage} />
            <Text style={styles.textNotice}>You Don't Have Any Active Parking Sessions Right Now</Text>
            <View style={styles.parkNow}>
                <Button
                    color="#ffffff"
                    title="Park Now"
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        marginTop: 56
    },
    parkNow: {
        backgroundColor: '#4886ff',
        width: 256,
        height: 39,
        borderRadius: 8,
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 105,
        textAlign: 'center'
    }
});

export default Active;