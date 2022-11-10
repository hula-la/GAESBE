import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Unity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64%;
  background-color: #232323;
  position: relative;

  .imageContainer{
    width: 73%;
    position: relative;
    display: inline-block;
    *display: inline;
    zoom: 1;
  }
`;
const MyRoom = styled.img`
  width: 100%;
  height: 15%;
  margin-bottom: 15%;


`;
const MyComputer = styled.img`
  width: 15%;
  /* height: 15%; */
  position: absolute;
  bottom: 46%;
  left: 30%;
  :hover {
    transform: scale(1.2);
    transition: 0.4s ease-in-out;
    cursor: url("/img/cursor/hover_cursor.png"),auto;
  }
`;
const Coin = styled.img`
  width: 4%;
  height: 3%;
  position: absolute;
  bottom: 56%;
  left: 50%;
  :hover {
    transform: scale(1.2);
    transition: 0.4s ease-in-out;
    cursor: url("/img/cursor/hover_cursor.png"),auto;
  }
`;
const Note = styled.img`
  width: 9%;
  position: absolute;
  bottom: 38%;
  right: 61%;
  :hover {
    transform: scale(1.2);
    transition: 0.4s ease-in-out;
    cursor: url("/img/cursor/hover_cursor.png"),auto;
  }
`;
const Calender = styled.img`
  /* width: 5%;
  height: 12%; */
  position: absolute;
  bottom: 61%;
  right: 15%;
  width: 7%;
  height: 12%;
  /* bottom: 24vh;
  right: 31vw; */
  :hover {
    transform: scale(1.2);
    transition: 0.4s ease-in-out;
    cursor: url("/img/cursor/hover_cursor.png"),auto;
  }
`;
const Level0 = ({attendance}:any) => {
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
      <div className="imageContainer">
        <MyRoom src="/img/MyOffice/level00.png"
        alt="lv0 room"/>

        <MyComputer
          onClick={handleAlert}
          src="/img/MyOffice/level00computer.png"
          alt="내 컴퓨터"
        />
        <Coin onClick={handleCoin} src="/img/coin/coin.png" />
        <Note src="/img/MyOffice/level0note.png" />
        <Calender onClick={attendance} src="/img/MyOffice/level0calender.png" />
      </div>
    </Unity>
  );
};

export default Level0;
