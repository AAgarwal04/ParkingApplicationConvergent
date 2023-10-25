import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signin from './Signin';

export default function App() {
  return (
    <View style={styles.container}>
      <Signin />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
  },
  body: {
    fontSize: 24,
    fontWeight: '200',
    color: 'white',
  },
});
