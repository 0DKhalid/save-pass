/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Clipboard,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as walletActions from '../store/walletActions';
import Colors from '../constants/Colors';
import CustomAlert from '../components/UI/CustomAlert';
import CustomAreYouSureAlert from '../components/CustomAreYouSureAlert';

const dynamicValue = (direction, divisionNum) =>
  Dimensions.get('window')[direction] / divisionNum;

let itemId;
const WalletItem = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [expand, setExband] = useState(false);
  const [showDeletionAlert, setShowDeletionAlert] = useState(false);
  const dispatch = useDispatch();

  const copyHandler = () => {
    if (itemId) {
      clearTimeout(itemId);
    }
    setShowAlert(true);
    Clipboard.setString(props.password);
    itemId = setTimeout(() => setShowAlert(false), 700);
  };

  const expandDetialHandler = () => {
    setExband((prevState) => !prevState);
  };

  const removeHanlder = () => {
    try {
      dispatch(walletActions.removeData(props.id));
    } catch (err) {
      Alert.alert('حدثة مشكلة', err.message, [{ text: 'إغلاق' }]);
    }
    setShowDeletionAlert(false);
  };
console.log(props.searchedItemIndex)
  return (
    <View>
      <CustomAreYouSureAlert
        visible={showDeletionAlert}
        cancel={() => setShowDeletionAlert(false)}
        confirm={removeHanlder}
      />
      <View
        style={{
          ...styles.walletItem,
          ...{ marginBottom: !expand ? 10 : 0 },
          ...{
            borderWidth:
              props.searchedItemIndex === props.itemIndex &&
              props.searchedItemIndex !== -1
                ? 1
                : 0,
            borderColor:
              props.searchedItemIndex === props.itemIndex &&
              props.searchedItemIndex !== -1
                ? Colors.red
                : '',
          },
        }}
      >
        <CustomAlert
          visible={showAlert}
          text='تم النسخ'
          iconName='md-checkmark-circle'
          iconColor={Colors.success}
        />
        <View style={styles.formGroup}>
          <Text style={styles.title}>عنوان كلمة السر</Text>
          <Text style={styles.titleContent}>{props.title}</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.passwordContainer}>كلمة السر</Text>
          <Text onPress={copyHandler} style={styles.password}>
            {props.password}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => setShowDeletionAlert(true)}>
            <Ionicons
              name='md-trash'
              size={dynamicValue('width', 15)}
              color={Colors.red}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={expandDetialHandler}>
            <Ionicons
              name={!expand ? 'ios-arrow-down' : 'ios-arrow-up'}
              size={dynamicValue('width', 15)}
              color={Colors.secondaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onEdit.bind(this, props.id)}>
            <Ionicons
              name='md-create'
              size={dynamicValue('width', 15)}
              color={Colors.success}
            />
          </TouchableOpacity>
        </View>
      </View>
      {expand && (
        <View style={styles.detialContainer}>
          <Text style={styles.detialTitle}>التفاصيل</Text>
          <Text style={styles.detialText}>{props.detial}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  walletItem: {
    marginTop: 20,

    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
  },
  formGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  title: {
    flexDirection: 'column',
    fontSize: 22,
    paddingHorizontal: 15,
    paddingTop: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  titleContent: {
    color: Colors.titleText,
    fontSize: 19,
    fontWeight: 'normal',
  },
  passwordContainer: {
    fontSize: 23,
    paddingVertical: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  password: {
    marginHorizontal: 10,
    letterSpacing: 5,
    backgroundColor: '#ccc',
    fontWeight: 'normal',
    fontSize: 18,
  },
  iconsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detialContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    borderRadius: 5,
  },
  detialTitle: {
    zIndex: 1,
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  detialText: {
    zIndex: 1,
    fontSize: 18,
    color: Colors.titleText,
    paddingBottom: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
});

export default WalletItem;
