import { View, Text, StyleSheet, Button, Pressable, FlatList } from "react-native";
import bookingData from "../assets/bookingData";
import { Colors } from "react-native/Libraries/NewAppScreen";

const History = () => {
    const renderCategoryItem = ({ item }) => {
        return (
            <View style={styles.bookingListContainer}>
                <View style={styles.containerHeader}>
                    <Text style={styles.categoryid}>Booking ID: #{item.id} </Text>
                </View>
                <View style={styles.containerBody}>
                    <Text style={styles.categoryAddress}>{item.address}</Text>
                    <Text style={styles.categoryStartDate}>Booked on: {item.bookingDate}</Text>
                    <Text style={styles.categoryEndDate}>Session end: {item.sessionEnd}</Text>
                    <Text style={styles.categoryTotal}>
                        <Text style = {styles.totalHeader}>Total: </Text>
                        <Text>{item.total}</Text>
                    </Text>
                </View>

            </View>
        );
    };
    return (
        <View style={styles.historyContainer}>
            <Text style={styles.dateHeader}>2023</Text>
            <View>
                <FlatList 
                    data={bookingData}
                    renderItem={renderCategoryItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>


    );
}
 
export default History;

const styles = StyleSheet.create ({
    historyContainer: {

    },
    dateHeader: {
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 32,
        marginBottom: 20,
        color: "#4886ff"
    },
    bookingListContainer: {
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 33,
        width: 352,
        height: 137,
        alignSelf: 'center',
        borderColor: "#B3B3B3"
    },
    containerHeader: {
        borderBottomWidth: 2,
        borderBottomColor: "#B3B3B3",
    },
    categoryid: {
        fontSize: 15,
        color: "#4886ff",
        paddingLeft: 9,
        lineHeight: 36
    },
    containerBody: {
        margin: 9,
    },
    categoryAddress: {
        fontSize: 14,
        lineHeight: 20

    },
    categoryStartDate: {
        fontSize: 14,
        lineHeight: 20
    },
    categoryEndDate: {
        fontSize: 14,
        lineHeight: 20
    },
    categoryTotal: {
        fontSize: 14,
        lineHeight: 20,
        marginLeft: 241
    },
    totalHeader: {
        color: '#4886ff'
    }
})