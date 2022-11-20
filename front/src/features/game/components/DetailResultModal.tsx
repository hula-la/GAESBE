import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlgoDetailInfo from './algo/AlgoDetailInfo';

import styled from 'styled-components';

const StyledModal = styled.div`
  padding: 3vmin;
  width: 40vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  background-color: #F0568C;
  z-index: 1000;
  color: black;
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

function AlgoModal({ handleModal, algoDetailRoomCode }: any) {
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
        <AlgoDetailInfo
          handleModal={handleModal}
          algoDetailRoomCode={algoDetailRoomCode}
        />
      </StyledModal>
    </StyledModalDiv>
  );
}
export default AlgoModal;
