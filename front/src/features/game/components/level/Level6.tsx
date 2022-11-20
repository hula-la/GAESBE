import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Unity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #232323;
  position: relative;

  .imageContainer {
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

const MyCharacter = styled.img`
      width: 12%;
    position: absolute;
    bottom: 33%;
    left: 43%;
    z-index: 4;

    animation: happyMotion 0.4s linear 0s infinite ; 
  
  @keyframes happyMotion {
	0% {margin-bottom: 0px;}
	50% {margin-bottom: 4%;}
	100% {margin-bottom: 0px;}
}
`;


const Samsung = styled.img`
      width: 24%;
    position: absolute;
    bottom: 48%;
    left: 51%;
    margin-bottom: 3%;
  /* bottom: 24vh;
  right: 31vw; */
  /* :hover {
    transform: scale(1.2);
    transition: 0.4s ease-in-out;
    cursor: url('/img/cursor/hover_cursor.png'), auto;
  } */
  `;
const Level6 = ({ handleModal,officeIdx }: any) => {
  const navigate = useNavigate();

  
  const { userInfo } = useSelector((state: any) => state.auth);
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
        {userInfo && <MyCharacter
              src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
              className="profileImg"
              alt="profileImg"
            />}
        

        <Samsung  src="/img/MyOffice/samsung.png" />
      </div>
    </Unity>
  );
};

export default Level6;
