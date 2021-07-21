import React from 'react';
import {Dimensions} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import TopBar from '../../components/TopBar';
import http from '../../services/http';
import TokenStorage from '../../services/storage/token';
import Axios from 'axios';

import {
  OkIcon,
  ClockIcon,
  DescriptionIcon,
  UserAddIcon,
  CheckIcon,
  MessageIcon,
  RepeatIcon,
  BellIcon,
  RightColorIcon,
  PlusColorIcon,
} from '../../assets/icons';

import * as S from './styled';
import Toggle from '../../components/Toggle';
import ConfirmModal from './components/ConfirmModal';
import ColorModal from './components/ColorModal';
import RepeatModal from './components/RepeatModal';
import RemindModal from './components/RemindModal';
import ContactModal from './components/ContactModal';

const AddEventScreen = ({navigation}) => {
  const [isConfirmEnabled, setConfirmEnabled] = React.useState(false);
  const [isNotifyEnabled, setNotifyEnabled] = React.useState(false);
  // INFO
  const [selectedDay, setSelectedDay] = React.useState({
    // '2021-06-13': {
    [moment().format('YYYY-MM-DD')]: {
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

  const currentTime = new Date();
  const endTime = new Date();
  const time5 = endTime.setHours(
    currentTime.getHours(),
    currentTime.getMinutes() + 5,
  );

  const [eventInfo, setEventInfo] = React.useState({
    name: '',
    description: '',
    confirm: 'За день до события',
    repeat: 'Без повтора',
    remind: 'Без напоминания',
    timeStart: currentTime,
    timeEnd: endTime,
  });
  const [selectedContacts, setSelectedContacts] = React.useState([]);

  const setOption = (type, value) => {
    setEventInfo({
      ...eventInfo,
      [type]: value,
    });
  };

  const onDateChange = (value, type) => {
    if (type === 'timeStart') {
      const eTime = new Date(value);
      eTime.setHours(value.getHours(), value.getMinutes() + 5);
      setEventInfo({
        ...eventInfo,
        timeStart: value,
        timeEnd: eTime,
      });
      return;
    }
    setEventInfo({
      ...eventInfo,
      [type]: value,
    });
  };

  // MODALS
  const [modalTypeVisible, setModalTypeVisible] = React.useState(null);

  const renderModal = () => {
    return (
      <>
        <ConfirmModal
          close={closeModal}
          visible={modalTypeVisible === 'confirm'}
          setOption={setOption}
          activeOption={eventInfo.confirm}
        />
        <RepeatModal
          close={closeModal}
          visible={modalTypeVisible === 'repeat'}
          setOption={setOption}
          activeOption={eventInfo.repeat}
        />
        <ColorModal
          onColorPick={color => setSelectedColor(color)}
          close={closeModal}
          visible={modalTypeVisible === 'color'}
        />
        <RemindModal
          close={closeModal}
          visible={modalTypeVisible === 'remind'}
          setOption={setOption}
          activeOption={eventInfo.remind}
        />
        <ContactModal
          close={closeModal}
          visible={modalTypeVisible === 'contact'}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
        {modalTypeVisible === 'timeStart' && (
          <DatePicker
            style={{alignSelf: 'center', width: Dimensions.get('window').width}}
            mode="time"
            onDateChange={e => onDateChange(e, 'timeStart')}
            date={eventInfo.timeStart}
            minimumDate={new Date()}
          />
        )}
        {modalTypeVisible === 'timeEnd' && (
          <DatePicker
            style={{alignSelf: 'center', width: Dimensions.get('window').width}}
            mode="time"
            onDateChange={e => onDateChange(e, 'timeEnd')}
            date={eventInfo.timeEnd}
            minimumDate={eventInfo.timeStart}
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
    try {
      const token = await TokenStorage.get();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await Axios.post(
        'http://82.146.48.248:90/api/Events',
        {
          Name: eventInfo.name,
          Description: eventInfo.description,
          StartDate: `${Object.keys(selectedDay)[0]}T${moment(
            eventInfo.timeStart,
          ).format('HH:mm:ss')}`,
          EndDate: `${Object.keys(selectedDay)[0]}T${moment(
            eventInfo.timeEnd,
          ).format('HH:mm:ss')}`,
          RepeatType: 'DoNotRepeat',
          InvitedUsers: ['e68aa406-00e2-4256-a089-adfa6642b91d'],
          InvitedNonExistedPhoneNumbers: ['375293825122'],
          Color: selectedColor,
          NotifyBeforeInMinutes: 15,
          ConfirmBeforeInHours: 12,
        },
        config,
      );

      navigation.goBack();
      console.log('data', data);
    } catch (err) {
      alert(JSON.stringify(err));
    }
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
        <S.NameInput
          onChangeText={e => setOption('name', e)}
          value={eventInfo.name}
          placeholder="Название события"
        />
        <S.DateInfoContainer>
          <S.DateButton onPress={onOpenCalendar}>
            <ClockIcon />
            <S.Date isSelected={modalTypeVisible === 'date'}>
              {moment(Object.keys(selectedDay)[0])
                .format('DD MMMM, dd')
                .toLocaleLowerCase('ru')}
            </S.Date>
          </S.DateButton>
          <S.TimeButton onPress={() => onOpenDatepicker('timeStart')}>
            <S.TimeLabel>Начало</S.TimeLabel>
            <S.Time isSelected={modalTypeVisible === 'timeStart'}>
              {moment(eventInfo.timeStart).format('H:mm')}
            </S.Time>
          </S.TimeButton>
          <S.Separator />
          <S.TimeButton onPress={() => onOpenDatepicker('timeEnd')}>
            <S.TimeLabel>Конец</S.TimeLabel>
            <S.Time isSelected={modalTypeVisible === 'timeEnd'}>
              {moment(eventInfo.timeEnd).format('H:mm')}
            </S.Time>
          </S.TimeButton>
        </S.DateInfoContainer>
        {renderModal()}
        <ColorModal visible={false} />
        <S.RowContainer>
          <DescriptionIcon />
          <S.DescriptionInput
            onChangeText={e => setOption('description', e)}
            value={eventInfo.description}
            placeholder="Добавить описание"
          />
        </S.RowContainer>
        <S.RowContainer>
          <UserAddIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('contact')}>
            {!selectedContacts.length ? (
              <S.Label>Добавить участника</S.Label>
            ) : (
              <>
                <S.ContactsRow>
                  {selectedContacts.map((c, index) => (
                    <S.ContactNameContainer>
                      <S.ContactFirstname>{c.familyName}</S.ContactFirstname>
                      <S.ContactLastname>
                        {' '}
                        {c.givenName}
                        {index !== selectedContacts.length - 1 ? ',' : ''}{' '}
                      </S.ContactLastname>
                    </S.ContactNameContainer>
                  ))}
                </S.ContactsRow>
                <PlusColorIcon />
              </>
            )}
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <CheckIcon />
          <S.TouchableRow
            onPress={() => setModalTypeVisible('confirm')}
            style={{marginLeft: 10}}>
            <S.Label>Подтверждение ({eventInfo.confirm})</S.Label>
            <Toggle
              toggle={() => setConfirmEnabled(!isConfirmEnabled)}
              isActive={isConfirmEnabled}
            />
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <MessageIcon />
          <S.TouchableRow onPress={() => setNotifyEnabled(!isNotifyEnabled)}>
            <S.Label style={{color: '#F4BF25'}}>Offline-уведомелния</S.Label>
            <Toggle
              isActive={isNotifyEnabled}
              toggle={() => setNotifyEnabled(!isNotifyEnabled)}
            />
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <RepeatIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('repeat')}>
            <S.Label>Повторяемость</S.Label>
            <S.ValueContainer>
              <S.Value>{eventInfo.repeat}</S.Value>
              <RightColorIcon />
            </S.ValueContainer>
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <BellIcon />
          <S.TouchableRow onPress={() => setModalTypeVisible('remind')}>
            <S.Label>Напоминание</S.Label>
            <S.ValueContainer>
              <S.Value>{eventInfo.remind}</S.Value>
              <RightColorIcon />
            </S.ValueContainer>
          </S.TouchableRow>
        </S.RowContainer>
        <S.RowContainer>
          <S.ColorBox color={selectedColor} />
          <S.TouchableRow onPress={() => setModalTypeVisible('color')}>
            <S.Label>Цвет события</S.Label>
          </S.TouchableRow>
        </S.RowContainer>
      </S.Content>
    </S.Container>
  );
};

export default AddEventScreen;
