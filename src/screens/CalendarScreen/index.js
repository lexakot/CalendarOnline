import React, {useCallback, useMemo, useRef} from 'react';
import {Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Calendar from '../../components/Calendar';

import * as S from './styled';

export const CalendarScreen = () => {

  // variables
  const snapPoints = useMemo(() => ['45%', '67%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <S.Container>
      <Calendar />
      <BottomSheet
        handleComponent={() => <S.TopHandle />}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      />
    </S.Container>
  );
};

export default CalendarScreen;
