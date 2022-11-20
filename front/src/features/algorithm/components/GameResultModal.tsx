import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';

const StyledModal = styled.div`
  padding: 3vmin;
  width: 40vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  border: 5px solid black;
  border-radius: 20px;
  background-color: #F0568C;
  z-index: 1000;
  color: white;
  display: flex;
  flex-direction: column;

  .modal-title {
    height: 10%;
    text-align: center;
    font-size: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-btn {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      margin:3% 2% 0 2%;
    }
  }
  `;

  const ModalWrapper = styled.div`
    margin: auto;
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    border: 5px solid #000;
    color:#000;  
    
    .modal-content {
      height: 100%;
      display: flex;
      flex-direction : column;
      justify-content:space-around;
      align-items: center;
    }

    .msg{
      margin-top: 5%;
      font-size: 2rem;
    }

    img{
      width: 110%;
    }
    .rank{
      margin-bottom: 5%;
      font-size: 2rem;
    }

  `
  const StyledModalDiv = styled.div`
  top: 0%;
  left: 0%;
  position: fixed;
  width: 1000%;
  height: 1000%;
  z-index: 105;
  background-color: rgba(0, 0, 0, 0.4);
`;


function GameResultModal({ handleModal, myRank }: any) {
  const navigate = useNavigate()

  const {gameResultMsg} = useSelector((state:any)=> state.algo)

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      // overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const leaveAlgoInGamePage = () => {
    navigate('/game/algo', {replace:true})
  }

  return (
    <StyledModalDiv onClick={handleModal}>
      <StyledModal onClick={(e)=> e.stopPropagation()}>
         <div className='modal-title'>
            <span>알고리즘 배틀 결과</span>
          </div>
        <ModalWrapper>
          <div className='modal-content'>
            <div className='msg'>{gameResultMsg}</div>

              {myRank <= 3 ? <img src={`/img/rank/medal${myRank-1}.png`}/>:<span style={{'fontSize':'6rem'}}>{myRank==4?"🎉":"😥"}</span>}

            <div className='rank'>{myRank} 등 입니다!</div>
          </div>
        </ModalWrapper>
        <div className='modal-btn'>
            <button className="eightbit-btn eightbit-btn--proceed" onClick={handleModal}>남아있기</button>
            <button className="eightbit-btn " onClick={leaveAlgoInGamePage}>떠나가기</button>
          </div>
      </StyledModal>
    </StyledModalDiv>
  )
}
export default GameResultModal