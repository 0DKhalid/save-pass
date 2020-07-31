import React, { useState, useReducer } from 'react';
import { View, StyleSheet, Button, ScrollView, Clipboard } from 'react-native';
import { useDispatch } from 'react-redux';
import * as walletActions from '../store/walletActions';
import { GenerateRandomPassword } from '../util/PasswordGenertor';
import NumericNumber from '../components/PasswordLength';
import Filters from '../components/UI/Filter';
import Colors from '../constants/Colors';
import ShowGeneratedPass from '../components/ShowGeneratedPass';
import CustomAlert from '../components/UI/CustomAlert';

const SET_FILTER = 'SET_FILTER';
const SET_PASSWORD_LENGTH = 'SET_PASSWORD_LENGTH';
const SET_GENERATED_PASSWORD = 'SET_GENERATED_PASSWORD';
const filtersReucer = (state, action) => {
  switch (action.type) {
    case SET_FILTER: {
      const updatedFilters = { ...state.filters };
      updatedFilters[action.filter] = !state.filters[action.filter];
      const updateIsFilterSet = Object.values(updatedFilters).every(
        (filter) => !filter
      );
      return {
        ...state,
        filters: updatedFilters,
        isFilterSet: updateIsFilterSet,
        generatedPassword: '',
      };
    }

    case SET_PASSWORD_LENGTH: {
      let updatedLength = state.passLength;
      if (action.trigger === 'max') {
        updatedLength = state.passLength >= 20 ? 20 : state.passLength + 1;
      } else {
        updatedLength = state.passLength <= 6 ? 6 : state.passLength - 1;
      }
      return {
        ...state,
        generatedPassword: '',
        passLength: updatedLength,
      };
    }

    case SET_GENERATED_PASSWORD:
      return {
        ...state,
        generatedPassword: action.password,
      };

    default:
      return state;
  }
};

let itemId;

const GeneratePassword = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [state, dispatch] = useReducer(filtersReucer, {
    filters: {
      upperCase: false,
      lowerCase: false,
      numbers: false,
      symbols: false,
    },
    isFilterSet: true,
    passLength: 6,
    generatedPassword: '',
  });

  const dispatchAction = useDispatch();
  const onChangeLength = (trigger) => {
    dispatch({ type: SET_PASSWORD_LENGTH, trigger });
  };

  const onChangeFilter = (filter) => {
    dispatch({ type: SET_FILTER, filter });
  };

  const generateRndPass = () => {
    const passwordGenerator = new GenerateRandomPassword(
      state.filters.lowerCase,
      state.filters.upperCase,
      state.filters.symbols,
      state.filters.numbers,
      state.passLength
    );

    dispatch({
      type: SET_GENERATED_PASSWORD,
      password: passwordGenerator.getPassword,
    });
  };

  const copyHandler = () => {
    if (itemId) {
      clearTimeout(itemId);
    }
    setShowAlert(true);
    Clipboard.setString(state.generatedPassword);
    itemId = setTimeout(() => setShowAlert(false), 700);
  };

  const saveGeneratedPassHandler = () => {
    dispatchAction(walletActions.saveGeneratedPass(state.generatedPassword));
    props.navigation.navigate('RigesterWallet');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomAlert
          visible={showAlert}
          text="تم النسخ"
          iconName="md-checkmark-circle"
          iconColor={Colors.success}
        />
        <NumericNumber
          value={state.passLength}
          minimize={onChangeLength.bind(this, 'min')}
          maxmize={onChangeLength.bind(this, 'max')}
        />
        <View style={styles.filters}>
          <Filters
            text="أحرف صغيرة"
            isEnabled={state.filters.lowerCase}
            toggleSwitch={onChangeFilter.bind(this, 'lowerCase')}
          />
          <Filters
            text="أحرف كبيرة"
            isEnabled={state.filters.upperCase}
            toggleSwitch={onChangeFilter.bind(this, 'upperCase')}
          />
          <Filters
            text="رموز خاصة"
            isEnabled={state.filters.symbols}
            toggleSwitch={onChangeFilter.bind(this, 'symbols')}
          />
          <Filters
            text="أرقام"
            isEnabled={state.filters.numbers}
            toggleSwitch={onChangeFilter.bind(this, 'numbers')}
          />

          <Button
            title="توليد"
            disabled={state.isFilterSet}
            color={Colors.secondaryColor}
            onPress={generateRndPass}
          />
        </View>
        {!!state.generatedPassword && (
          <ShowGeneratedPass
            password={state.generatedPassword}
            copy={copyHandler}
            save={saveGeneratedPassHandler}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  filters: {
    margin: 40,
  },
  success: {
    color: 'green',
  },
});

export default GeneratePassword;
