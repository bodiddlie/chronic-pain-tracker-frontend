import React from 'react';
import styled from 'styled-components/macro';
import {
  addDays,
  format,
  getDay,
  getDaysInMonth,
  isSameMonth,
  startOfMonth,
  startOfToday,
  subDays,
} from 'date-fns';

import { MonthSwitcher } from './month-switcher';
import { Month } from './month';

function generateDays(currentMonth) {
  let days = [];
  const lastMonthDays = getDay(currentMonth);
  let current = subDays(currentMonth, lastMonthDays);

  const startDay = getDay(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const totalDays = startDay + daysInMonth + 1;
  const rows = totalDays / 7 > 5 ? 6 : 5;

  for (let i = 0; i < rows * 7; i++) {
    let day = {
      show: isSameMonth(current, currentMonth),
      date: current,
      key: format(current, 'MMddyyyy'),
    };
    days.push(day);
    current = addDays(current, 1);
  }

  return { days, rows };
}

export function Calendar() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(today));
  const [calendar, setCalendar] = React.useState(generateDays(currentMonth));

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    setCalendar(generateDays(month));
  };

  return (
    <Container>
      <MonthSwitcher month={currentMonth} onClick={handleMonthChange} />
      <LabelRow>
        <Label>S</Label>
        <Label>M</Label>
        <Label>T</Label>
        <Label>W</Label>
        <Label>Th</Label>
        <Label>F</Label>
        <Label>Sa</Label>
      </LabelRow>
      <Month calendar={calendar} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const LabelRow = styled.div`
  display: flex;
`;

const Label = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
`;

const Tag = styled.span`
  font-size: 0.5rem;
  border-radius: 1.5rem;
  background-color: blue;
  color: white;
  white-space: nowrap;
`;
