import React from 'react';

import * as S from './styled';

const RadioButton = ({label, isActive, onPress}) => {
  return (
    <S.Container onPress={onPress}>
      <S.Label>{label}</S.Label>
      <S.DotContainer>
        <S.Dot isActive={isActive} />
      </S.DotContainer>
    </S.Container>
  );
};

export default RadioButton;
