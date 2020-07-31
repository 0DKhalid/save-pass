/* eslint-disable prefer-template */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as NetInfo from '@react-native-community/netinfo';
import Colors from '../constants/Colors';
import CustomButton from '../components/UI/Button';
import CustomInput from '../components/UI/CustomInput';

const FindPass = () => {
  const [userInput, setUserInput] = useState('');
  const [showUpMsg, setShowUpMsg] = useState('');
  const [passVisibility, setPassVisibility] = useState(true);
  const [dangerColor, setDangerColor] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (inputText) => {
    setDangerColor();
    setShowUpMsg('');
    setUserInput(inputText);
  };

  const encryptUserInput = async (pass) => {
    const hashedPass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      pass
    );
    const firstFiveChar = hashedPass.slice(0, 5);
    const lastFullChar = hashedPass.slice(5, 40);

    return {
      firstFiveChar: firstFiveChar.toUpperCase(),
      lastFullChar: lastFullChar.toUpperCase(),
    };
  };

  const fetchMatchesPass = async (fiveChar) => {
    try {
      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${fiveChar}`
      );
      if (!response.ok) {
        Alert.alert(
          'حدث خطأ',
          'حدث خطأ أثناء عملية البحث يرجى المحاولة مره أخرى',
          [{ text: 'إغلاق' }]
        );
      }
      const hashedPasswordsList = await response.text();

      return hashedPasswordsList.split('\n');
    } catch (err) {
      Alert.alert(
        'حدث خطأ',
        'حدث خطأ أثناء عملية البحث يرجى المحاولة مره أخرى',
        [{ text: 'إغلاق' }]
      );
    }
  };

  const onClickHandler = async () => {
    if (!userInput) {
      Alert.alert('حدث خطأ', 'الرجاء إدخال كلمة سر في مربع البحث', [
        { text: 'إغلاق' },
      ]);
      return;
    }

    const netStatusRes = await NetInfo.fetch();
    if (!netStatusRes.isConnected)
      Alert.alert('مشكلة في الإتصال', 'تأكد من انك متصل بالإنترنت', [
        { text: 'إغلاق' },
      ]);

    setIsLoading(true);
    const { firstFiveChar, lastFullChar } = await encryptUserInput(userInput);
    const passList = await fetchMatchesPass(firstFiveChar);
    findMatchPass(passList, lastFullChar);
    setIsLoading(false);
  };

  const findMatchPass = (passList, lastFullChar) => {
    const matchPass = passList.find(
      (hashPass) => hashPass.split(':')[0].toUpperCase() === lastFullChar
    );

    if (!matchPass) {
      setShowUpMsg('لا توجد كلمة مرور مطابقة🙂');

      return;
    }

    const timesOfFound = +matchPass.split(':')[1];

    const times =
      timesOfFound === 1
        ? 'مره واحده'
        : timesOfFound === 2
        ? 'مرتين'
        : timesOfFound > 2 && timesOfFound <= 10
        ? timesOfFound + ' مرات'
        : timesOfFound + ' مرة';

    setShowUpMsg(`تم العثور عليه ${times}😨`);
    setDangerColor({
      container: '#FF4C4C',
      msg: '#B23535',
    });
  };

  return (
    <View style={styles.container}>
      <CustomInput
        visible={passVisibility}
        userInput={userInput}
        inputChange={onChangeHandler}
        placeholder="أدخل كلمة السر"
        toggleVisibility={() => setPassVisibility((prevState) => !prevState)}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.secondaryColor} />
      ) : (
        <CustomButton onPress={onClickHandler} />
      )}

      {!!showUpMsg && (
        <View
          style={{
            ...styles.resultContainer,
            borderColor: dangerColor ? dangerColor.container : '#72CA8D',
          }}
        >
          <Text
            style={{
              ...styles.resultMsg,
              color: dangerColor ? dangerColor.msg : '#5BA170',
            }}
          >
            {showUpMsg}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  resultContainer: {
    borderWidth: 1,
    borderRadius: 5,

    marginVertical: 15,
    padding: 10,
  },
  resultMsg: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default FindPass;
