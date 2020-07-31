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

const ForgotPassModal = (props) => {
  return (
    <CustomModal
      transparent
      visible={props.visible}
      animationType="slide"
      styleModal={styles.modalContainer}
      styleModalContent={styles.modalContent}
    >
      <Text style={styles.title}>نسيان كلمة السر</Text>
      <Text style={styles.text}>
        لسوء الحظ لاتوجد طريقة لإستعادة كلمة المرور أو استرجاع البيانات المخزنة
        داخل الحافظة وهذا راجع للسياسة التي يتبعها التطبيق لحماية بياناتك حيث
        أنه يتم تخزين البيانات بشكل مشفر داخل جهازك والمفتاح لفك التشفير هي كلمة
        مرور الحافظة إذا كنت فعلا نسيت كلمة المرور فالحل الوحيد هو إنشاء حافظة
        جديدة وعند إنشائها سيتم حذف الحافظة القديمة والله يعوض عليك في بياناتك.
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
          title="إنشاء حافظة جديدة"
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
        ? dynamicValue('height', 1.6)
        : dynamicValue('height', 2),
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
  text: { fontSize: dynamicValue('width', 25.8) },
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

export default ForgotPassModal;
