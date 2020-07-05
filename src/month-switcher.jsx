import React from 'react';
import styled from 'styled-components/macro';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { format, addMonths } from 'date-fns';

export function MonthSwitcher({ month, onClick }) {
  const handlePrev = () => {
    onClick(addMonths(month, -1));
  };

  const handleNext = () => {
    onClick(addMonths(month, 1));
  };

  return (
    <Container>
      <Button onClick={handlePrev}>
        <FiArrowLeft />
      </Button>
      <span>{format(month, 'MMMM yyyy')}</span>
      <Button onClick={handleNext}>
        <FiArrowRight />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 1.25rem;
  padding: 0.25rem;
`;

const Button = styled.button.attrs({ type: 'button' })`
  background: transparent;
  border: none;
`;
