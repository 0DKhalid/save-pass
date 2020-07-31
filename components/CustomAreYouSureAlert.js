import React from 'react';
import { Text, Button, View, StyleSheet, Dimensions } from 'react-native';
import CustomModal from './UI/CustomModal';
import Colors from '../constants/Colors';

const dynamicValue = (direction, divisionNum) =>
  Dimensions.get('window')[direction] / divisionNum;

const CustomAreYouSureAlert = (props) => {
  return (
    <CustomModal
      transparent
      visible={props.visible}
      animationType="slide"
      styleModal={styles.modalContainer}
      styleModalContent={styles.modalContent}
    >
      <Text style={styles.title}>هل فعلا تريد حذف هذه البيانات</Text>
      <Text style={styles.text}>
        إذا كن فعلا تريد حذف هذه البيانات اضغط حذف.
      </Text>
      <View style={styles.btnContainer}>
        <Button title="حذف" color={Colors.red} onPress={props.confirm} />
        <Button
          title="إلغاء"
          color={Colors.secondaryColor}
          onPress={props.cancel}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 25,
    height:
      Dimensions.get('window').height < 590
        ? dynamicValue('height', 3.5)
        : dynamicValue('height', 3.7),
    width: dynamicValue('width', 1.2),
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    elevation: 7,
  },
  title: {
    fontSize: dynamicValue('width', 17.8),
    fontWeight: 'bold',
    color: Colors.titleText,
  },
  text: { fontSize: dynamicValue('width', 18), marginTop: 10 },
  btnContainer: {
    marginTop: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomAreYouSureAlert;
