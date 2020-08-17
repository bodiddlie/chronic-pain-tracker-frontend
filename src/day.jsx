import React from 'react';
import styled from 'styled-components/macro';
import { getDate } from 'date-fns';

export function Day({ dayData, day, isSelected, onSelect }) {
  const handleSelect = () => {
    onSelect(day.key);
  };

  return (
    <Container onClick={handleSelect} isSelected={isSelected}>
      <span>{getDate(day.date)}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
  align-items: flex-start;
  border: 1px solid ${(props) => (props.isSelected ? 'green' : 'transparent')};
`;
