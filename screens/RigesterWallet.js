import React from 'react';
import RigesterWalletCom from '../containers/RigesterWallet';

const RigesterWallet = (props) => {
  return <RigesterWalletCom navigation={props.navigation} />;
};

export const screenOptions = {
  headerRight: '',
};

export default RigesterWallet;
