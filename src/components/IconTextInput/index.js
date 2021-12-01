import React from 'react';
import * as S from './styled';

const IconTextInput = ({
  placeholder,
  icon = null,
  isTouchable = false,
  style = {},
}) => {
  return (
    <S.Container style={style}>
      {icon}
      {!isTouchable ? (
        <S.Input placeholder={placeholder} />
      ) : (
        <S.TouchableContainer>
          <S.Label>{placeholder}</S.Label>
        </S.TouchableContainer>
      )}
    </S.Container>
  );
};

export default IconTextInput;
