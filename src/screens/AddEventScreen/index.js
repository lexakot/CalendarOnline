import React from 'react';
import {Dimensions} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import TopBar from '../../components/TopBar';
import http from '../../services/http';

import {
  OkIcon,
  ClockIcon,
  DescriptionIcon,
  UserAddIcon,
  CheckIcon,
  MessageIcon,
  RepeatIcon,
  BellIcon,
} from '../../assets/icons';

import * as S from './styled';
import Toggle from '../../components/Toggle';
import ConfirmModal from './components/ConfirmModal';
import ColorModal from './components/ColorModal';
import RepeatModal from './components/RepeatModal';
import RemindModal from './components/RemindModal';
import ContactModal from './components/ContactModal';

const AddEventScreen = () => {
  const [isCalendarVisible, setCalendarVisible] = React.useState(false);
  const [isTimeVisible, setTimeVisible] = React.useState(false);

  // INFO
  const [selectedDay, setSelectedDay] = React.useState({
    '2021-06-13': {
      selected: true,
      customStyles: {
        container: {
          backgroundColor: '#4A70BF',
          borderRadius: 8,
        },
        text: {
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
      },
    },
  });
  const [selectedColor, setSelectedColor] = React.useState('#32B67A');

  // MODALS
  const [modalTypeVisible, setModalTypeVisible] = React.useState(null);

  const renderModal = () => {
    return (
      <>
        <ConfirmModal
          close={closeModal}
          visible={modalTypeVisible === 'confirm'}
        />
        <RepeatModal
          close={closeModal}
          visible={modalTypeVisible === 'repeat'}
        />
        <ColorModal
          onColorPick={color => setSelectedColor(color)}
          close={closeModal}
          visible={modalTypeVisible === 'color'}
        />
        <RemindModal
          close={closeModal}
          visible={modalTypeVisible === 'remind'}
        />
        <ContactModal
          close={closeModal}
          visible={modalTypeVisible === 'contact'}
        />
        {modalTypeVisible === 'timeStart' && (
          <DatePicker
            style={{alignSelf: 'center', width: Dimensions.get('window').width}}
            mode="time"
            date={new Date()}
          />
        )}
        {modalTypeVisible === 'timeEnd' && (
          <DatePicker
            style={{alignSelf: 'center', width: Dimensions.get('window').width}}
            mode="time"
            date={new Date()}
          />
        )}
        {modalTypeVisible === 'date' && (
          <Calendar
            enableSwipeMonths
            markingType={'custom'}
            hideArrows
            renderHeader={() => {}}
            style={{
              paddingTop: 20,
            }}
            markedDates={selectedDay}
            onDayPress={onDayPress}
            // markedDates={this.state.markedDates}
            theme={{
              backgroundColor: 'yellow',
              calendarBackground: 'white',
              dayTextColor: '#16243D',
              todayTextColor: 'red',
              textDisabledColor: 'rgba(255, 255, 255, 0.4)',
              textSectionTitleColor: '#16243D',
              dotColor: 'red',
              selectedDotColor: '#4C79D9',
            }}
          />
        )}
      </>
    );
  };

  const closeModal = () => setModalTypeVisible(null);

  const onOpenCalendar = () => {
    if (modalTypeVisible === 'date') {
      setModalTypeVisible(null);
    } else {
      setModalTypeVisible('date');
    }
  };

  const onOpenDatepicker = type => {
    if (modalTypeVisible === type) {
      setModalTypeVisible(null);
    } else {
      setModalTypeVisible(type);
    }
  };

  const onDayPress = e => {
    setSelectedDay({
      [e.dateString]: {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: '#4A70BF',
            borderRadius: 8,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
        },
      },
    });
  };

  const onCreateEvent = async () => {
    const {data} = await http.post('/Events', {
      Name: 'event name',
      Description: 'event description',
      StartDate: '2021-06-15T16:03:15',
      EndDate: '2021-06-15T18:03:15',
      RepeatType: 'DoNotRepeat',
      InvitedUsers: ['e68aa406-00e2-4256-a089-adfa6642b91d'],
      InvitedNonExistedPhoneNumbers: ['375293825122'],
      Color: '#A7D8DC',
      NotifyBeforeInMinutes: 15,
      ConfirmBeforeInHours: 12,
    });
    console.log('data', data);
  };

  return (
    <S.Container>
      <TopBar
        title="Новое событие"
        withBackButton
        withRightButton
        renderRightButton={() => <OkIcon />}
        onRightButtonPress={onCreateEvent}
      />
      <S.Content>
        <S.NameInput placeholder="Название события" />
        <S.DateInfoContainer>
          <S.DateButton onPress={onOpenCalendar}>
            <ClockIcon />
            <S.Date isSelected={modalTypeVisible === 'date'}>
              {moment(Object.keys(selectedDay)[0]).format('DD MMMM, dd').toLocaleLowerCase('ru')}
            </S.Date>
          </S.DateButton>
          <S.TimeButton onPress={() => onOpenDatepicker('timeStart')}>
            <S.TimeLabel>Начало</S.TimeLabel>
            <S.Time isSelected={modalTypeVisible === 'timeStart'}>8.00</S.Time>
          </S.TimeButton>
          <S.Separator />
          <S.TimeButton onPress={() => onOpenDatepicker('timeEnd')}>
            <S.TimeLabel>Конец</S.TimeLabel>
            <S.Time isSelected={modalTypeVisible === 'timeEnd'}>8.00</S.Time>
          </S.TimeButton>
        </S.DateInfoContainer>
        {renderModal()}
        <ColorModal visible={false} />
        <S.RowContainer>
          <DescriptionIcon />
          <S.DescriptionInput placeholder="Добавить описание" />
        </S.RowContainer>
        <S.RowContainer>
          <UserAddIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('contact')}>
            <S.Label>Добавить участника</S.Label>
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <CheckIcon />
          <S.TouchableRow
            onPress={() => setModalTypeVisible('confirm')}
            style={{marginLeft: 10}}>
            <S.Label>Подтверждение (за день)</S.Label>
            <Toggle isActive />
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <MessageIcon />
          <S.TouchableRow>
            <S.Label style={{color: '#F4BF25'}}>Offline-уведомелния</S.Label>
            <Toggle />
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <RepeatIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('repeat')}>
            <S.Label>Повторяемость</S.Label>
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <BellIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('remind')}>
            <S.Label>Напоминание</S.Label>
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <S.ColorBox color={selectedColor} />
          <S.TouchableRow onPress={() => setModalTypeVisible('color')}>
            <S.Label>Цвет</S.Label>
          </S.TouchableRow>
        </S.RowContainer>
      </S.Content>
    </S.Container>
  );
};

export default AddEventScreen;
