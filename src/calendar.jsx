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
import { Day } from './day';
import { getDataForMonth } from './api';

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
      key: format(current, 'yyyy-MM-dd'),
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
  const [days, setDays] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState('2020-08-01');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getDataForMonth(currentMonth).then(setDays);
  }, [currentMonth]);

  React.useEffect(() => {
    const d = days.find((e) => e.date === selectedDay);
    setData(d);
  }, [selectedDay, days]);

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    setCalendar(generateDays(month));
  };

  return (
    <Container>
      <CalWrapper>
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
        <MonthGrid rows={calendar.rows}>
          {calendar.days.map((day) => {
            const formattedDate = format(day.date, 'yyyy-MM-dd');
            const dayData = days.find((e) => e.date === formattedDate);
            return (
              <Day
                key={day.key}
                day={day}
                dayData={dayData}
                isSelected={day.key === selectedDay}
                onSelect={handleSelect}
              />
            );
          })}
        </MonthGrid>
      </CalWrapper>
      <ControlWrapper>
        <Control data={data} />
      </ControlWrapper>
    </Container>
  );
}

function Control({ data }) {
  return <div>{data ? <div>data</div> : <div>hi</div>}</div>;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: red;
`;

const LabelRow = styled.div`
  display: flex;
`;

const Label = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
`;

const MonthGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  background-color: pink;
  grid-gap: 1px;
  border-top: 1px solid pink;
`;
