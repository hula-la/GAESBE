import React from 'react';
import styled from 'styled-components';

const LoadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;

const CSIsLoadingPage = () => {
  return (
    <LoadingBlock>
      <img src="/img/loadingspinner.gif" />
      <p className="loadingText">랜덤 매칭중~</p>
    </LoadingBlock>
  );
};

export default CSIsLoadingPage;
