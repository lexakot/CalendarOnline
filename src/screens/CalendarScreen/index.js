import React, {useCallback, useMemo, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Calendar from '../../components/Calendar';
import {PlusIcon} from '../../assets/icons';

import {getEventsRequest} from '../../redux/events';

import * as S from './styled';
import {connect} from 'react-redux';
import DateBlock from './components/DateBlock';

const CalendarScreen = ({navigation, getEventsRequest: getEvents, events}) => {
  const [isExpanded, setExpanded] = React.useState(true);
  const bottomSheetRef = React.useRef(null);
  const snapPoints = useMemo(() => ['30%', '67%'], []);

  const date = moment().format('YYYY-MM-DD');

  useEffect(() => {
    getEventsCallback();
  }, [getEventsCallback]);

  // callbacks
  const getEventsCallback = useCallback(() => {
    getEvents(date);
  }, [getEvents]);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleExpand = e => {
    console.log(isExpanded);
    // if (!isExpanded) {
    //   bottomSheetRef.current.expand();
    // } else {
    //   setExpanded(false);
    //   bottomSheetRef.current.collapse();
    // }
  };
  const groupedEvents = _.groupBy(events, e =>
    moment(e?.StartDate).format('YYYY-MM-DD'),
  );

  const renderDateBlocks = () => {
    if (!events.length) {
      return null;
    }
    const secondDay = moment(date)
      .add(1, 'day')
      .format('YYYY-MM-DD');
    const thirdDay = moment(date)
      .add(2, 'day')
      .format('YYYY-MM-DD');

    if (!Object.keys(groupedEvents).includes(secondDay)) {
      groupedEvents[secondDay] = [];
    }
    if (!Object.keys(groupedEvents).includes(thirdDay)) {
      groupedEvents[thirdDay] = [];
    }

    return (
      <>
        {Object.keys(groupedEvents).map(date => (
          <DateBlock
            title={moment(date).format('D MMMM, dddd')}
            events={groupedEvents[date]}
          />
        ))}
      </>
    );
  };
  return (
    <S.Container>
      <Calendar handleExpand={handleExpand} />
      <BottomSheet
        ref={bottomSheetRef}
        handleComponent={() => <S.TopHandle />}
        index={1}
        snapPoints={snapPoints}>
        <BottomSheetScrollView style={{paddingHorizontal: 28}}>
          {renderDateBlocks()}
        </BottomSheetScrollView>
        {/* <BottomSheetFlatList
          data={events}
          keyExtractor={i => i.id}
          renderItem={({item}) => <DateBlock events={events} />}
          contentContainerStyle={{paddingHorizontal: 28}}
        /> */}
      </BottomSheet>
      <S.AddButton onPress={() => navigation.navigate('AddEvent')}>
        <PlusIcon />
      </S.AddButton>
    </S.Container>
  );
};

const mapStateToProps = ({events}) => ({
  events: events.events,
});

const mapDispatchToProps = {
  getEventsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen);
