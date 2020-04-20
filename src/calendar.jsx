import React from "react";
import {
  getDay,
  getDate,
  startOfMonth,
  subDays,
  addDays,
  addMonths,
  isSameMonth,
  format,
  getDaysInMonth
} from "date-fns";
import styled, { keyframes } from "styled-components/macro";

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
      key: format(current, "MMddyyyy")
    };
    days.push(day);
    current = addDays(current, 1);
  }

  return { days, rows };
}

export function Calendar({ dayKey }) {
  const [daysDisplay, setDays] = React.useState([]);
  const [rowsDisplay, setRows] = React.useState(5);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  React.useEffect(
    () => {
      const cur = startOfMonth(dayKey || new Date());
      const { days, rows } = generateDays(currentMonth);

      setDays(days);
      setRows(rows);
      setCurrentMonth(cur);
    },
    [dayKey, currentMonth]
  );

  return (
    <Container>
      <Month>
        <span>&larr;</span>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <span>&rarr;</span>
      </Month>
      <Grid rows={rowsDisplay}>
        <Entry>Sun</Entry>
        <Entry>Mon</Entry>
        <Entry>Tue</Entry>
        <Entry>Wed</Entry>
        <Entry>Thu</Entry>
        <Entry>Fri</Entry>
        <Entry>Sat</Entry>
        {daysDisplay.map(day => (
          <Day key={day.key} date={day.date} show={day.show} />
        ))}
      </Grid>
    </Container>
  );
}

function Day({ date, show }) {
  return (
    <div>
      <span>{getDate(date)}</span>
      <span>.</span>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Month = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Grid = styled.div`
  flex: 1;
  max-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(${props => props.rows + 1}, 1fr);
  grid-gap: 5px;
`;

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const blink = keyframes`
  0% {
    border: 1px solid rgba(117, 117, 117, 0);
  }

  50% {
    border: 1px solid rgba(117, 117, 117, 1);
  }

  100% {
    border: 1px solid rgba(117, 117, 117, 0);
  }
`;
