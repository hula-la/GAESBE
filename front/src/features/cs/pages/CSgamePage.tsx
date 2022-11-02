import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 82%;
  background-color: #232323;
  color: #ffffff;
  display: flex;
  justify-content: center;
  .title {
    margin-top: 2rem;
    height: 15%;
  }
`;

const CSgamePage = () => {
  return (
    <Wrapper>
      <img src="/img/gametitle/gametitle2.png" alt="title" className="title" />
    </Wrapper>
  );
};

export default CSgamePage;
