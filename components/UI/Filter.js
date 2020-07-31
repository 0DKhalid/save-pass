import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const Filter = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.text,
          color: !props.isEnabled ? Colors.titleText : Colors.text
        }}
      >
        {props.text}
      </Text>
      <Switch
        trackColor={{ false: Colors.lightGrey, true: Colors.lightSecondary }}
        thumbColor={props.isEnabled ? Colors.secondaryColor : Colors.grey}
        ios_backgroundColor='#3e3e3e'
        onValueChange={props.toggleSwitch}
        value={props.isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    fontSize: 22,
    color: Colors.titleText
  }
});

export default Filter;
