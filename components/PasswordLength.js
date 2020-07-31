import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const NumericNumber = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>حدد طول كلمة السر</Text>
      <View style={styles.countContainer}>
        <TouchableOpacity onPress={props.minimize}>
          <AntDesign
            name="minuscircle"
            size={40}
            color="black"
            color={Colors.secondaryColor}
          />
        </TouchableOpacity>
        <Text style={styles.value}>{props.value}</Text>
        <TouchableOpacity onPress={props.maxmize}>
          <AntDesign
            name="pluscircle"
            size={40}
            color="black"
            color={Colors.secondaryColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
    height: '20%',
  },
  countContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: Colors.titleText,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 22,
    color: Colors.titleText,
    textAlign: 'center',
  },
});

export default NumericNumber;
