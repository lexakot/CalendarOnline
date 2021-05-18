import React, {useCallback, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Calendar from '../../components/Calendar';

import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import * as S from './styled';
import {useFocusEffect} from '@react-navigation/native';

export const CalendarScreen = () => {
  // useFocusEffect(() => {
  //   Contacts.getAll()
  //     .then(contacts => {
  //       console.log('contacts', contacts);
  //     })
  //     .catch(err => console.log('err', err));
  // });
  // variables
  const snapPoints = useMemo(() => ['30%', '67%'], []);

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
