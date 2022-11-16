import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import '../../../components/Common/retroBtn.css';
const Result = styled.div`
  width: 100%;
  height: 100%;
  background-color: #232323;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ResultButton = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TypingResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultId, resultNickName, resultProfile } = location.state;

  const handleHome = () => {
    navigate('/game');
  };
  const handleTypingHome = () => {
    navigate('/game/typing');
  };
  useEffect(() => {
    if (resultId && resultNickName && resultProfile) {
    }
  }, [resultId, resultNickName]);
  return (
    <Result>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight / 1.1}
      ></Confetti>
      <h1>축하합니다 우승입니다.</h1>
      <div>{resultNickName}</div>
      <img
        src={`${process.env.REACT_APP_S3_URL}/profile/${resultProfile}_normal.gif`}
        alt=""
      />
      <ResultButton>
        <a
          href="javascript:void(0)"
          className="eightbit-btn"
          onClick={handleHome}
        >
          메인으로
        </a>
        <a
          href="javascript:void(0)"
          className="eightbit-btn eightbit-btn--reset"
          onClick={handleTypingHome}
        >
          다시하기
        </a>
      </ResultButton>
      {/* <button onClick={handleHome}>나가기</button> */}
    </Result>
  );
};
export default TypingResultPage;
