import React from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 82%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 2rem;
    height: 15%;
    width: 25%;
  }
  .back::before {
    position: fixed;
    top: 0;
    left: 15%;
    right: 0;
    bottom: 0;
    width: 100%;
    background-image: url(/img/background2.png);
    filter: blur(5px);
    z-index: -1;
    content: '';
  }
  .buttons {
    display: flex;
  }
  .random {
    background-color: #f0568c;
    width: 20vh;
    height: 20vh;
  }
  .friend {
    background-color: #ffd219;
    width: 20vh;
    height: 20vh;
  }
`;

const CSgamePage = () => {
  const navigate = useNavigate();
  const onClickRandom = () => {
    navigate('room', { state: { roomType: 'random' } });
  };
  return (
    <Wrapper>
      <div className="back"></div>
      <img src="/img/gametitle/gametitle3.png" alt="title" className="title" />
      <div>CS를 신속 정확하게 풀어 1등을 쟁취하라!</div>
      <div className="buttons">
        <div onClick={onClickRandom} className="random">
          랜덤 매칭
        </div>
        <div className="friend">친구 매칭 </div>
      </div>
    </Wrapper>
  );
};

export default CSgamePage;
