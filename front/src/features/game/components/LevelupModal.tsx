import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlgoDetailInfo from './algo/AlgoDetailInfo';

import styled from 'styled-components';

const StyledModal = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 0.5rem solid #ce372b; */
    background: #bd372c;
    justify-content: space-around;

  padding: 3vmin;
  width: 36vw;
  height: 61vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  /* background-color: white; */
  z-index: 1000;
  color: black;

  .levelUpTitle{
    height: 35%;
  }
`;
const StyledModalDiv = styled.div`
  top: 0%;
  left: 0%;
  position: fixed;
  width: 1000%;
  height: 1000%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;

const LevelUpGif = styled.img`
    /* margin: 7% 0; */
width: 80%;
border: 0.5rem solid black;
border-radius: 0.6rem;
`

function LevelupModal({ handleModal, nextLevel }: any) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      // overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <StyledModalDiv onClick={handleModal}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <img
          src="/img/levelUp2.png"
          className='levelUpTitle'
        />
        <LevelUpGif
          src={`/img/officeLevelUpGif/${nextLevel+1}.gif`}
        />
      </StyledModal>
    </StyledModalDiv>
  );
}
export default LevelupModal;
