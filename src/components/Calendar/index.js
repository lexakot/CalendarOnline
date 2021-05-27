import React from 'react';
import XDate from 'xdate';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import * as RN from 'react-native';

import * as S from './styled';

LocaleConfig.locales.ru = {
  monthNames: [
    'Январь',
    'Февралб',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ru';

const vacation = {key: 'vacation', dotColor: 'red', selectedDotColor: 'red'};

class CalendarComponent extends React.Component {
  state = {
    markedDates: {
      '2021-05-18': {
        dots: [vacation],
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
    },
  };
  calendarRef;

  renderHeader = e => {
    return (
      <S.HeaderContainer onPress={this.props.handleExpand}>
        <S.Month>{e.toString('MMMM')}</S.Month>
      </S.HeaderContainer>
    );
  };

  selectdDay = e => {
    console.log('day', e);
    this.setState({
      markedDates: {
        [e.dateString]: {
          dots: [vacation],
          marked: true,
          selected: true,
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
      }
    })
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Calendar
          enableSwipeMonths
          renderHeader={this.renderHeader}
          markingType={'custom'}
          hideArrows
          style={{
            paddingTop: 20,
          }}
          onDayPress={this.selectdDay}
          markedDates={this.state.markedDates}
          theme={{
            backgroundColor: 'yellow',
            calendarBackground: '#4A70BF',
            dayTextColor: 'white',
            todayTextColor: 'red',
            textDisabledColor: 'rgba(255, 255, 255, 0.4)',
            textSectionTitleColor: 'white',
            dotColor: 'red',
            selectedDotColor: '#4C79D9',
            // textSectionTitleDisabledColor: '#d9e1e8',
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            // todayTextColor: '#00adf5',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            // arrowColor: 'orange',
            // disabledArrowColor: '#d9e1e8',
            // monthTextColor: 'blue',
            // indicatorColor: 'blue',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            // textDayFontWeight: '300',
            // textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: '300',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}
        />
      </>
    );
  }
}

export default CalendarComponent;
