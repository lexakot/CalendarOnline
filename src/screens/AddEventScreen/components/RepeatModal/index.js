import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const RepeatModal = ({visible, close}) => {
  return (
    <BottomModal
      visible={visible}
      title="Повторяемость"
      height={234}
      close={close}>
      <S.RadioButtonContainer>
        <RadioButton isActive label="Без повтора" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer>
        <RadioButton label="Только выходные" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer withoutBorder>
        <RadioButton label="Только будни" />
      </S.RadioButtonContainer>
    </BottomModal>
  );
};

export default RepeatModal;
