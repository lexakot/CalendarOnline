import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

import * as S from './styled';

const BottomModal = ({close, title, children, height = 250, visible}) => {
  return (
    <Modal
      onSwipeComplete={close}
      swipeDirection={['down']}
      style={styles.modal}
      backdropOpacity={0.2}
      onBackdropPress={close}
      isVisible={visible}>
      <S.Wrapper height={height}>
        <S.Title>{title}</S.Title>
        {children}
      </S.Wrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default BottomModal;
