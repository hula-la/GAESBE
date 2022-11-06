import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 82%;
  background-color: #232323;
  color: #ffffff;
`;

const CSResultPage = () => {
  const location = useLocation();
  const { result } = location.state;
  useEffect(() => {
    console.log(result);
  });
  return (
    <Container>
      <p>결과 화면</p>
    </Container>
  );
};

export default CSResultPage;
