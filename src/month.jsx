import React from 'react';
import styled from 'styled-components/macro';
import {
  addDays,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  isSameMonth,
  startOfMonth,
  startOfToday,
  subDays,
} from 'date-fns';

import { MonthSwitcher } from './month-switcher';

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

export function Month() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(today));
  const genDays = generateDays(currentMonth);
  const [days, setDays] = React.useState(genDays.days);
  const [rows, setRows] = React.useState(genDays.rows);

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    const newDays = generateDays(month);
    setDays(newDays.days);
    setRows(newDays.rows);
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
      <Grid rows={rows}>
        {days.map((day) => (
          <Day key={day.key}>{getDate(day.date)}</Day>
        ))}
      </Grid>
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

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  background-color: pink;
  grid-gap: 1px;
  border-top: 1px solid pink;
`;

const Day = styled.div`
  dipslay: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
`;

const Tag = styled.span`
  font-size: 0.5rem;
  border-radius: 1.5rem;
  background-color: blue;
  color: white;
  white-space: nowrap;
`;
