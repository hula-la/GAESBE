import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Confetti from 'react-confetti'

const Result = styled.div`
  width: 100%;
  background-color: #232323;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;
const TypingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultId, resultNickName, resultProfile } = location.state;
  const handleHome = () => {
    navigate('/game');
  };
  useEffect(() => {
    if (resultId && resultNickName && resultProfile) {
    }
  }, [resultId, resultNickName]);
  return (
    <Result>
      <Confetti></Confetti>
      <h1>축하합니다 우승입니다.</h1>
      {/* <div>{resultId}</div> */}
      <div>{resultNickName}</div>
      <img
        src={`${process.env.REACT_APP_S3_URL}/profile/${resultProfile}_normal.gif`}
        alt=""
      />
      <button onClick={handleHome}>나가기</button>
    </Result>
  );
};
export default TypingResultPage;
