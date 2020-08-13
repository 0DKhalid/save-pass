import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ShowGeneratedPass = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.save}>
        <Fontisto name='save' size={35} color={Colors.secondaryColor} />
      </TouchableOpacity>
      <Text style={styles.text}>{props.password}</Text>
      <TouchableOpacity onPress={props.copy}>
        <Ionicons name='ios-copy' size={38} color={Colors.secondaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: Colors.text,
  },
});

export default ShowGeneratedPass;
