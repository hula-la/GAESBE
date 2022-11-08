import React, { useState } from 'react';
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
    cursor: pointer;
  }
  .friend {
    background-color: #ffd219;
    width: 20vh;
    height: 20vh;
    cursor: pointer;
  }
`;

const CSgamePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [shareCode, setShareCode] = useState<String>('');

  // 랜덤매칭 페이지로 이동
  const onClickRandom = () => {
    navigate('random');
  };

  // 친선전 오픈
  const onClickFriend = () => {
    setIsOpen((prev) => !prev);
  };

  // 방만들기
  const onClickCreateRoom = () => {
    navigate('friend', { state: { shareCode: null } });
  };

  // 코드 치고 들어가기
  const onClickEnterFriend = () => {
    navigate('friend', { state: { shareCode: shareCode } });
  };

  const onChangeCode = (e: any) => {
    setShareCode(e.target.value);
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
        <div onClick={onClickFriend} className="friend">
          <div>친구 매칭</div>
        </div>
        {isOpen && (
          <div>
            <div onClick={onClickCreateRoom}>방 만들기</div>
            <div>친구 코드</div>
            <input onChange={onChangeCode} />
            <button onClick={onClickEnterFriend}></button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CSgamePage;
