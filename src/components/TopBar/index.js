import React from 'react';
import {useNavigation} from '@react-navigation/native';

import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

import * as S from './styled';

const TopBar = ({title = '', withBackButton = false}) => {
  const navigation = useNavigation();
  return (
    <S.Container>
      {withBackButton ? (
        <S.BackButton onPress={navigation.goBack}>
          <LeftArrowIcon />
        </S.BackButton>
      ) : null}
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default TopBar;
