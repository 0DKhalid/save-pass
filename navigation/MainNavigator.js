import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/UI/HeaderBtn';
import Colors from '../constants/Colors';
import Home from '../screens/Home';
import GeneratePass from '../screens/GeneratePass';
import Wallet from '../screens/Wallet';
import RegisterWallet, {
  screenOptions as RigesterWalletScreenOptions,
} from '../screens/RigesterWallet';

const defaultHeaderStyle = {
  headerTitle: '',
  headerStyle: { backgroundColor: Colors.secondaryColor },
  headerTintColor: Colors.primaryWhite,
};

const defaultMainHeaderOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderBtn}>
        <Item
          title='passwords wallet'
          iconName='wallet'
          onPress={() => navData.navigation.navigate('RigesterWallet')}
        />
      </HeaderButtons>
    ),
  };
};

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName='Home'
    activeColor={Colors.primaryWhite}
    shifting
    barStyle={{ backgroundColor: Colors.secondaryColor }}
  >
    <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarLabel: 'الرئيسيه',
        tabBarIcon: (props) => (
          <Ionicons name='ios-home' size={23} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name='GeneratePass'
      component={GeneratePass}
      options={{
        tabBarLabel: 'إنشاء كلمة مرور',
        tabBarIcon: (props) => (
          <Ionicons name='md-create' size={24} color={props.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStackNavigator = () => (
  <Stack.Navigator
    screenOptions={(navData) => ({
      ...defaultHeaderStyle,
      ...defaultMainHeaderOptions(navData),
    })}
  >
    <Stack.Screen name='Main' component={BottomTabNavigator} />
    <Stack.Screen name='Wallet' component={Wallet} />
    <Stack.Screen
      name='RigesterWallet'
      component={RegisterWallet}
      options={RigesterWalletScreenOptions}
    />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
