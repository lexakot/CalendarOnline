import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const options = ['Без повтора', 'Только выходные', 'Только будни'];
const RepeatModal = ({visible, close, setOption, activeOption}) => {
  return (
    <BottomModal
      visible={visible}
      title="Повторяемость"
      height={234}
      close={close}>
      {options.map(option => (
        <S.RadioButtonContainer>
          <RadioButton
            onPress={() => setOption('repeat', option)}
            isActive={activeOption === option}
            label={option}
          />
        </S.RadioButtonContainer>
      ))}
    </BottomModal>
  );
};

export default RepeatModal;
