import React from 'react';
import styled from 'styled-components/macro';
import { getDate } from 'date-fns';

export function Month({ calendar }) {
  const { rows, days } = calendar;
  return (
    <Grid rows={rows}>
      {days.map((day) => (
        <Day key={day.key}>{getDate(day.date)}</Day>
      ))}
    </Grid>
  );
}

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
