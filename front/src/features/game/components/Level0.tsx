import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Unity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66%;
  background-color: #232323;
  background-image: url(/img/MyOffice/level00.png);
  background-repeat: no-repeat;
  background-size: 90%;
  /* background-size: 70%; */
  background-position-x: 50%;
  background-position-y: 50%;
`;
const MyComputer = styled.img`
  /* width: 7%;
  height: 15%; */
  position: absolute;
  bottom: 34vh;
  left: 37vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Coin = styled.img`
  width: 10%;
  height: 10%;
  position: absolute;
  bottom: 42vh;
  left: 45vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Note = styled.img`
  width: 4%;
  height: 8%;
  position: absolute;
  bottom: 35vh;
  right: 36vw;
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Calender = styled.img`
  /* width: 5%;
  height: 12%; */
  position: absolute;
  bottom: 45vh;
  right: 35vw;
  /* bottom: 24vh;
  right: 31vw; */
  :hover {
    transform: scale(1.3);
    transition: 0.4s ease-in-out;
  }
`;
const Level0 = ({ attendance }: any) => {
  const navigate = useNavigate();
  const handleCoin = () => {
    navigate('/game/casino');
  };
  const handleAlert = () => {
    navigate('/game/mypage');
    // alert('마이페이지로');
  };
  return (
    <Unity>
      <MyComputer
        onClick={handleAlert}
        src="/img/MyOffice/level00computer.png"
        alt="내 컴퓨터"
      />
      <Coin onClick={handleCoin} src="/img/coin/coin.png" />
      <Note src="/img/MyOffice/level0note.png" />
      <Calender onClick={attendance} src="/img/MyOffice/level0calender.png" />
    </Unity>
  );
};

export default Level0;
