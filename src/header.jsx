import React from 'react';
import styled from 'styled-components/macro';
import { FiMenu, FiUser } from 'react-icons/fi';

export function Header() {
  return (
    <Container>
      <FiMenu />
      <FiUser />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.5rem;
  background-color: blue;
  color: white;
`;
