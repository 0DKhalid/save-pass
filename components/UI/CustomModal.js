import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import {} from 'react-native-gesture-handler';

const CustomModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      animationType={props.animationType}
      transparent={props.transparent}
    >
      <View style={[styles.modal, props.styleModal]}>
        <View style={props.styleModalContent}>{props.children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});

export default CustomModal;
