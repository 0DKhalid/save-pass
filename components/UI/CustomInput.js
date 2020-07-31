import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CustomInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={props.value}
        secureTextEntry={props.visible}
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={props.inputChange}
      />
      <FontAwesome
        onPress={props.toggleVisibility}
        name={!props.visible ? 'eye' : 'eye-slash'}
        size={24}
        color={Colors.secondaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: '80%',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default CustomInput;
