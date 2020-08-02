import React from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import { Day } from './day';

export function Month({ calendar, monthData }) {
  const { rows, days } = calendar;
  return (
    <Grid rows={rows}>
      {days.map((day) => {
        const formattedDate = format(day.date, 'yyyy-MM-dd');
        const dayData = monthData.find((e) => e.date === formattedDate);
        return <Day key={day.key} day={day} dayData={dayData} />;
      })}
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
