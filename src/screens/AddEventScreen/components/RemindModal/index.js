import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const options = ['Без напоминания', 'За 1 час', 'За 15 минут'];

const RemindModal = ({visible, close, setOption, activeOption}) => {
  return (
    <BottomModal
      visible={visible}
      title="Напоминание"
      height={234}
      close={close}>
      {options.map(option => (
        <S.RadioButtonContainer>
          <RadioButton
            onPress={() => setOption('remind', option)}
            isActive={option === activeOption}
            label={option}
          />
        </S.RadioButtonContainer>
      ))}
    </BottomModal>
  );
};

export default RemindModal;
