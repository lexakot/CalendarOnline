import React from 'react';
import Event from '../Event';

import * as S from './styled';

const DateBlock = ({events = [], title = ''}) => {
  const sortEvents = () => {
    if (!events.length) {
      return [];
    }
    return events.sort(function(a, b) {
      return new Date(a.StartDate) - new Date(b.StartDate);
    });
  };

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {!events.length ? <S.Hint>Нет событий</S.Hint> : null}
      {sortEvents().map(e => (
        <Event event={e} />
      ))}
    </S.Container>
  );
};

export default DateBlock;
