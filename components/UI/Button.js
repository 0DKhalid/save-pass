import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const CustomButton = (props) => (
  <View style={styles.roundedBtn}>
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>أبحث</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  roundedBtn: {
    overflow: 'hidden',
    borderRadius: 10
  },
  btnContainer: {
    height: 35,
    width: 100,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: Colors.primaryWhite,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CustomButton;
