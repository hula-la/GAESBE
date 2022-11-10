import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { typingActions } from '../typingSlice';
import { useNavigate } from 'react-router-dom';
import { TypingRoomInterface } from '../../../models/typing';

const TypingMain = styled.div`
  width: 66%;
  background-color: #232323;
  justify-content: center;
  text-align: center;
  color: white;
  .title {
    text-align: center;
    height: 25%;
    img {
      height: 80%;
    }
  }
`;
const SelectLanguage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 10rem;
  border: 2px solid red;
  margin-bottom: 5rem;
`;
const SelectLanguageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  align-items: center;
  border: 2px solid blue;
  /* :active {
    background-color: white;
  } */
`;
const SelectGameType = styled.div`
  border: 2px solid white;
`;
const SelectTypeBox = styled.div`
  border: 2px solid violet;
`;
function TypingMainPage() {
  const [gameType, setGameType] = useState<String>('');
  const navigate = useNavigate();
  const handleEnterGame = () => {
    navigate('enter', { state: { lang: gameType } });
  };
  const handleRandomGame = () => {
    navigate('enter', { state: { lang: gameType } });
  };
  const handleChoicePython = () => {
    setGameType('PYTHON');
    console.log('파이썬 선택');
  };
  const handleChoiceJava = () => {
    setGameType('JAVA');
    console.log('자바 선택');
  };
  console.log(gameType);
  return (
    <TypingMain>
      <div className="title">
        <img src="/img/gametitle/gametitle2.png" alt="title" />
      </div>
      <h1>언어를 선택해주세요</h1>
      <SelectLanguage>
        <SelectLanguageBox onClick={handleChoicePython}>
          파이썬
        </SelectLanguageBox>
        <SelectLanguageBox onClick={handleChoiceJava}>자바</SelectLanguageBox>
      </SelectLanguage>
      <SelectGameType>
        <SelectTypeBox>
          <button onClick={handleRandomGame}>랜덤매칭</button>
        </SelectTypeBox>
        <SelectTypeBox>
          <button onClick={handleEnterGame}>솔로게임</button>
        </SelectTypeBox>
      </SelectGameType>
    </TypingMain>
  );
}

export default TypingMainPage;
