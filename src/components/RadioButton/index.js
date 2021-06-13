import React from 'react';

import * as S from './styled';

const RadioButton = ({label, isActive}) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.DotContainer>
        <S.Dot isActive={isActive} />
      </S.DotContainer>
    </S.Container>
  );
};

export default RadioButton;
