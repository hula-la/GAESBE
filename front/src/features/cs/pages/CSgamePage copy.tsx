import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'NeoDunggeunmo';
  /* width: 82%; */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 2rem;
    height: 15%;
    width: 25%;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    filter: blur(3px);
  }
  .content {
    margin-top: 10rem;
    font-size: 35px;
  }
  .buttons {
    display: flex;
    width: 40%;
    margin-top: 7rem;
    justify-content: space-around;
  }
  .random {
    background-color: #f0568c;
    width: 20vh;
    height: 20vh;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 4px 18px rgba(255, 255, 255, 0.25));
    border: 5px solid #232323;
  }
  .questionMark {
    width: 60%;
    height: 60%;
    margin-bottom: 1rem;
  }
  .friend {
    background-color: #ffd219;
    width: 20vh;
    height: 20vh;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 4px 18px rgba(255, 255, 255, 0.25));
    border: 5px solid #232323;
  }
  .friendMark {
    width: 60%;
    height: 40%;
    margin-bottom: 2rem;
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
      <img src="/img/background/background3.jpg" className="back" />
      <img src="/img/gametitle/gametitle3.png" alt="title" className="title" />
      <div className="content">CS를 신속 정확하게 풀어 1등을 쟁취하라!</div>
      <div className="buttons">
        <div onClick={onClickRandom} className="random">
          <img className="questionMark" src="/img/questionMark.png" />
          랜덤 매칭
        </div>
        <div onClick={onClickFriend} className="friend">
          <img className="friendMark" src="/img/friendMark.png" />
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
