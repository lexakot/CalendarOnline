import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const ConfirmModal = ({visible, close}) => {
  return (
    <BottomModal
      visible={visible}
      title="Подтверждение"
      height={234}
      close={close}>
      <S.RadioButtonContainer>
        <RadioButton isActive label="За день до события" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer>
        <RadioButton label="За 12 часов до события" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer withoutBorder>
        <RadioButton label="За 3 часа до события" />
      </S.RadioButtonContainer>
    </BottomModal>
  );
};

export default ConfirmModal;
