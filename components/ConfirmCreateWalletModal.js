import React from 'react';
import {
  CheckBox,
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomModal from './UI/CustomModal';
import Colors from '../constants/Colors';

const dynamicValue = (direction, divisionNum) =>
  Dimensions.get('window')[direction] / divisionNum;

const ConfirmCreateWalletModal = (props) => {
  return (
    <CustomModal
      transparent
      visible={props.visible}
      animationType="slide"
      styleModal={styles.modalContainer}
      styleModalContent={styles.modalContent}
    >
      <Text style={styles.title}>ملاحظة هامة</Text>
      <Text style={styles.text}>
        سيتم إنشاء حافظة وجميع البيانات التي سوف تخزن داخلها ستخزن بشكل مشفر
        ومفتاح التشفير هي كلمة المرور التي أدخلتها لعمل هذه الحافظة تأكد من
        حفظها وتخزينها في مكان امن حيث أنه عند فقدانها لايمكن استعادتها وستفقد
        جميع البيانات المخزنه داخل الحافظة.
      </Text>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={props.checked}
          onValueChange={props.toggleCheck}
          style={styles.checkbox}
        />
        <Text style={styles.label}>موافق</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="إنشاء"
          color={Colors.success}
          onPress={props.confirmCreation}
          disabled={!props.checked}
        />
        <Button
          title="إلغاء"
          color={Colors.red}
          onPress={props.cancelCreation}
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
        ? dynamicValue('height', 1.9)
        : dynamicValue('height', 2.2),
    width: dynamicValue('width', 1.2),
    backgroundColor: '#F7F7F7',
    borderRadius: 5,
    elevation: 7,
  },
  title: {
    fontSize: dynamicValue('width', 17),
    fontWeight: 'bold',
    color: Colors.titleText,
  },
  text: { fontSize: dynamicValue('width', 26) },
  btnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginVertical: 5,
    marginHorizontal: 3,
  },
});

export default ConfirmCreateWalletModal;
