import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const RemindModal = ({visible, close}) => {
  return (
    <BottomModal
      visible={visible}
      title="Напоминание"
      height={234}
      close={close}>
      <S.RadioButtonContainer>
        <RadioButton isActive label="Без напоминания" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer>
        <RadioButton label="За 1 час" />
      </S.RadioButtonContainer>
      <S.RadioButtonContainer withoutBorder>
        <RadioButton label="За 15 минут" />
      </S.RadioButtonContainer>
    </BottomModal>
  );
};

export default RemindModal;
