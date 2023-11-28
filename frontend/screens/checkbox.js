// CheckboxComponent.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CheckboxComponent = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={styles.checkbox}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'black',
  },
});

export default CheckboxComponent;
