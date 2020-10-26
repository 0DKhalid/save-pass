import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import CustomModal from '../components/UI/CustomModal';
import Colors from '../constants/Colors';

const AddOrEditSenstiveData = (props) => {
  const { title, senstiveData, detial } = props;
  return (
    <CustomModal
      visible={props.visible}
      animationType='slide'
      styleModalContent={styles.modalContentContainer}
    >
      <Text style={styles.title}>
        {props.editMode ? 'تحديث البيانات' : 'تحزين بيانات جديده'}
      </Text>
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior='padding'>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>عنوان كلمة السر</Text>
            <TextInput
              value={title}
              style={styles.input}
              onChangeText={props.onChange.bind(this, 'title')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>كلمة السر</Text>
            <TextInput
              value={senstiveData}
              style={styles.input}
              onChangeText={props.onChange.bind(this, 'senstiveData')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>التفاصيل</Text>
            <TextInput
              value={detial}
              style={styles.input}
              onChangeText={props.onChange.bind(this, 'detial')}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title='إلغاء'
              onPress={props.hideModal}
              color={Colors.red}
            />

            <Button
              title='حفظ'
              onPress={props.save}
              color={Colors.secondaryColor}
              disabled={
                !title.trim().length ||
                !detial.trim().length ||
                !senstiveData.trim().length
                  ? true
                  : false
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalContentContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.titleText,
    marginVertical: 10,
    textAlign: 'center',
  },

  form: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    color: Colors.text,
    marginTop: 20,
  },
  input: {
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 7,
    paddingVertical: 1,
    marginBottom: 20,
    textAlign: 'right',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default AddOrEditSenstiveData;
