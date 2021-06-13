import React, {useCallback, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Calendar from '../../components/Calendar';
import {PlusIcon} from '../../assets/icons';

import * as S from './styled';

const CalendarScreen = ({navigation}) => {
  const [isExpanded, setExpanded] = React.useState(true);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = useMemo(() => ['30%', '67%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleExpand = (e) => {
    console.log(isExpanded);
    // if (!isExpanded) {
    //   bottomSheetRef.current.expand();
    // } else {
    //   setExpanded(false);
    //   bottomSheetRef.current.collapse();
    // }
  };

  return (
    <S.Container>
      <Calendar handleExpand={handleExpand} />
      <BottomSheet
        ref={bottomSheetRef}
        handleComponent={() => <S.TopHandle />}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      />
      <S.AddButton onPress={() => navigation.navigate('AddEvent')}>
        <PlusIcon />
      </S.AddButton>
    </S.Container>
  );
};

export default CalendarScreen;
