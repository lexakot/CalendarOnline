import React from 'react';
import BottomModal from '../../../../components/BottomModal';
import RadioButton from '../../../../components/RadioButton';

import * as S from './styled';

const options = [
  'За день до события',
  'За 12 часов до события',
  'За 3 часа до события',
];
const ConfirmModal = ({visible, close, setOption, activeOption}) => {
  console.log('activeOption', activeOption);
  return (
    <BottomModal
      visible={visible}
      title="Подтверждение"
      height={234}
      close={close}>
      {options.map(option => (
        <S.RadioButtonContainer>
          <RadioButton
            onPress={() => setOption('confirm', option)}
            isActive={activeOption === option}
            label={option}
          />
        </S.RadioButtonContainer>
      ))}
    </BottomModal>
  );
};

export default ConfirmModal;
