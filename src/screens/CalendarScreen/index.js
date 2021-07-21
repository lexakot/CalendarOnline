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

  const [date, setDate] = React.useState({
    [moment().format('YYYY-MM-DD')]: {
      // dots: [vacation],
      selected: true,
      marked: true,
      customStyles: {
        container: {
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
        },
        text: {
          color: '#16243D',
          fontWeight: 'bold',
        },
      },
    },
  });

  useFocusEffect(() => {
    getEventsCallback();
  });

  // useEffect(() => {
  //   getEventsCallback();
  // }, [getEventsCallback]);

  // callbacks
  const getEventsCallback = useCallback(() => {
    getEvents(Object.keys(date)[0]);
  }, [date, getEvents]);

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
    // if (!events.length) {
    //   return null;
    // }
    const secondDay = moment(Object.keys(date)[0])
      .add(1, 'day')
      .format('YYYY-MM-DD');
    const thirdDay = moment(Object.keys(date)[0])
      .add(2, 'day')
      .format('YYYY-MM-DD');

    if (!Object.keys(groupedEvents).includes(Object.keys(date)[0])) {
      groupedEvents[Object.keys(date)[0]] = [];
    }
    if (!Object.keys(groupedEvents).includes(secondDay)) {
      groupedEvents[secondDay] = [];
    }
    if (!Object.keys(groupedEvents).includes(thirdDay)) {
      groupedEvents[thirdDay] = [];
    }

    return (
      <>
        {Object.keys(groupedEvents)
          .sort((a, b) => {
            if (a < b) {
              return -1;
            } else if (b < a) {
              return 1;
            } else {
              return 0;
            }
          })
          .map(d => (
            <DateBlock
              title={moment(d).format('D MMMM, dddd')}
              events={groupedEvents[d]}
            />
          ))}
      </>
    );
  };

  const onDateChange = d => {
    getEvents(d);
    setDate({
      [d]: {
        // dots: [vacation],
        selected: true,
        marked: true,
        customStyles: {
          container: {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
          },
          text: {
            color: '#16243D',
            fontWeight: 'bold',
          },
        },
      },
    });
  };

  return (
    <S.Container>
      <Calendar
        selectedDate={date}
        selectDay={onDateChange}
        handleExpand={handleExpand}
      />
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
