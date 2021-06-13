import React from 'react';
import BottomModal from '../../../../components/BottomModal';

import * as S from './styled';

const colors = ['#32B67A', '#E77C74', '#F4BF25', '#4C79D9'];

const ColorModal = ({visible, close, onColorPick}) => {
  const selectedColor = color => {
    onColorPick(color);
    close();
  };

  return (
    <BottomModal
      visible={visible}
      title="Цвет события"
      height={128}
      close={close}>
      <S.ColorsRow>
        {colors.map(color => (
          <S.ColorBox onPress={() => selectedColor(color)} color={color} />
        ))}
      </S.ColorsRow>
    </BottomModal>
  );
};

export default ColorModal;
