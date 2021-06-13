/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import * as S from './styled';

const Toggle = ({isActive}) => {
  return (
    <S.Container isActive={isActive}>
      <S.Round
        style={{
          [!isActive ? 'left' : 'right']: 2,
        }}
        isActive={isActive}
      />
    </S.Container>
  );
};

export default Toggle;
