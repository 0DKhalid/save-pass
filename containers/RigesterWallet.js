import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { useDispatch } from 'react-redux';
import * as walletActions from '../store/walletActions';
import checkPassStrength from '../util/passStrenth';
import CustomInput from '../components/UI/CustomInput';
import Colors from '../constants/Colors';
import ConfirmCreateWalletModal from '../components/ConfirmCreateWalletModal';
import ForgotPassModal from '../components/ForgotPassModal';
import CustomAlert from '../components/UI/CustomAlert';

let timeId;
const RigesterWallet = (props) => {
  const [isHasWallet, setIsHasWallet] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [passwordStrength, setPasswordStrength] = useState();
  const [visiblePass, setVisiblePass] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checkedToConfirm, setCheckedToConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [confirmForgotModal, setConfirmForgotModal] = useState(false);
  const [passWrong, setPassWrong] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const walletKey = await SecureStore.getItemAsync('walletKey');
        if (walletKey) {
          setIsHasWallet(true);
        }
      } catch (error) {
        Alert.alert(
          'حدث خطأ',
          'إذا تكرر معك هذا الخطأ قم بأغلاق التطبيق وفتحة مرة اخرى أو أنشاء حافظ جديده'
        );
      }

      setIsLoading(false);
    })();
  }, []);

  const rigesterHandler = () => {
    setShowConfirmModal(true);
  };

  const loginHandler = async () => {
    setLoader(true);
    setUserInput('');
    setIsDisable(true);
    const hashedUserInput = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      userInput
    );
    const walletKey = await SecureStore.getItemAsync('walletKey');

    if (walletKey.toUpperCase() !== hashedUserInput.toUpperCase()) {
      setPassWrong(true);
      if (timeId) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(() => setPassWrong(false), 1000);
      setLoader(false);
      return;
    }

    dispatch(walletActions.setWalletKey(hashedUserInput));
    setLoader(false);
    props.navigation.navigate('Wallet');
  };

  const onInputChangeHandler = (inputText) => {
    const trimUserInput = inputText.replace(/\s/g, '');
    if (trimUserInput.length >= 6) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }

    setUserInput(trimUserInput);
    if (!isHasWallet) {
      setPasswordStrength(checkPassStrength(inputText));
    }
  };
  const confirmWalletCreation = async () => {
    try {
      const hashedUserInput = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        userInput
      );
      await SecureStore.setItemAsync('walletKey', hashedUserInput);
      setIsHasWallet(true);
      setShowConfirmModal(false);
    } catch (error) {
      Alert.alert('حدث خطأ', 'حدث خطأ أثناء عمل حافظة جديدة حاول مره أخرى');
    }
  };

  const forgotPassHandler = async () => {
    await dispatch(walletActions.resetDB());
    await SecureStore.deleteItemAsync('walletKey');
    setShowForgotPassModal(false);
    setIsHasWallet(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.secondaryColor} />
        ) : (
          <View style={styles.card}>
            <CustomAlert
              visible={passWrong}
              text="كلمة السر خاطئة"
              iconName="ios-close-circle"
              iconColor={Colors.red}
            />
            <Text style={styles.text}>
              {!isHasWallet ? 'إنشاء حافظة جديده' : 'تسجيل الدخول للحافظة'}
            </Text>
            <CustomInput
              placeholder="أدخل كلمة سر الحافظة"
              visible={visiblePass}
              value={userInput}
              toggleVisibility={() => setVisiblePass((prevState) => !prevState)}
              inputChange={onInputChangeHandler}
            />
            {passwordStrength?.strength && !isHasWallet && !!userInput && (
              <Text
                style={{
                  color: passwordStrength.color,
                  textAlign: 'right',
                  width: '70%',
                }}
              >
                {passwordStrength.strength}
              </Text>
            )}
            <View style={styles.btnContainer}>
              {loader ? (
                <ActivityIndicator size="small" color={Colors.secondaryColor} />
              ) : (
                <Button
                  title={isHasWallet ? 'دخول' : 'إنشاء'}
                  onPress={isHasWallet ? loginHandler : rigesterHandler}
                  color={Colors.secondaryColor}
                  disabled={isDisable}
                />
              )}
              <ConfirmCreateWalletModal
                visible={showConfirmModal}
                cancelCreation={() => setShowConfirmModal(false)}
                checked={checkedToConfirm}
                toggleCheck={() =>
                  setCheckedToConfirm((prevState) => !prevState)
                }
                confirmCreation={confirmWalletCreation}
              />
              <ForgotPassModal
                visible={showForgotPassModal}
                checked={confirmForgotModal}
                toggleCheck={() =>
                  setConfirmForgotModal((prevState) => !prevState)
                }
                cancelCreation={() => setShowForgotPassModal(false)}
                confirmCreation={forgotPassHandler}
              />
              {isHasWallet && (
                <Button
                  title="نسيت كلمة السر"
                  onPress={() => setShowForgotPassModal(true)}
                  color={Colors.red}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: '#fff',
    elevation: 7,
    borderRadius: 10,
  },

  btnContainer: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: Colors.titleText,
    paddingBottom: 10,
  },
});

export default RigesterWallet;
