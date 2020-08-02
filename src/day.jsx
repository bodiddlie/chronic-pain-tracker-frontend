import React from 'react';
import styled from 'styled-components/macro';
import { getDate } from 'date-fns';

export function Day({ dayData, day }) {
  const tags = dayData ? dayData.notes.split('\n') : [];
  return (
    <Container>
      {getDate(day.date)}
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  align-items: flex-start;
`;

const Tag = styled.span`
  font-size: 0.5rem;
  border-radius: 1.5rem;
  background-color: blue;
  color: white;
  white-space: nowrap;
  margin-bottom: 0.1rem;
  padding: 0.1rem 0.5rem;
  font-weight: bold;
`;
