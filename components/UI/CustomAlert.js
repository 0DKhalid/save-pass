import React from 'react';
import { View, Modal, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CustomAlert = (props) => {
  return (
    <Modal transparent animationType='slide' visible={props.visible}>
      <View style={styles.modal}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{props.text}</Text>
          <Ionicons
            name={props.iconName}
            size={Dimensions.get('window').width / 4}
            color={props.iconColor}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '50%',
    height: '25%',
    backgroundColor: '#ffff',
    borderRadius: 6,
    elevation: 7,
  },
  text: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.titleText,
  },
});

export default CustomAlert;
