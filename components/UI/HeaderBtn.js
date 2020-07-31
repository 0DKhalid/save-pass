import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const HeaderBtn = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Entypo}
    iconSize={24}
    color={Colors.primaryWhite}
  />
);

export default HeaderBtn;
