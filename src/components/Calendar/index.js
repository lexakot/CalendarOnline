import React from 'react';
import XDate from 'xdate';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import * as RN from 'react-native';

import * as S from './styled';

LocaleConfig.locales.ru = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
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

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'red'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'red'};
const workout = {key: 'workout', color: 'green'};

class CalendarComponent extends React.Component {
  calendarRef;
  state = {
    current: '2012-03-01',
  };

  renderHeader = () => {
    return (
      <S.HeaderContainer>
        <S.Month>Март</S.Month>
      </S.HeaderContainer>
    );
  }
  render() {
    console.log(this.state);
    return (
      <>
        {/* <RN.Button
          onPress={() => this.setState({current: '2018-04-01'})}
          title="123"
        /> */}
        <Calendar
          renderHeader={this.renderHeader}
          current={this.state.current}
          markingType={'custom'}
          hideArrows
          style={{
            paddingTop: 20
          }}
          // markedDates={{
          //   '2021-05-16': {
          //     dots: [vacation, massage, workout],
          //     selected: true,
          //     customStyles: {
          //       container: {
          //         backgroundColor: '#FFFFFF',
          //         borderRadius: 8,
          //       },
          //       text: {
          //         color: '#16243D',
          //         fontWeight: 'bold',
          //       },
          //     },
          //   },
          // }}
          theme={{
            backgroundColor: 'yellow',
            calendarBackground: '#4A70BF',
            dayTextColor: 'white',
            todayTextColor: 'red',
            textDisabledColor: 'rgba(255, 255, 255, 0.4)',
            textSectionTitleColor: 'white',
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
