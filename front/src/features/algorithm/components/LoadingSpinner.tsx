
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.img`
  width: 40vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  /* border: 1px solid black; */
  border-radius: 20px;
  z-index: 1000;
  color: black;
`;

const StyledSpinnerDiv = styled.div`
  top: 0%;
  left: 0%;
  position: fixed;
  width: 1000%;
  height: 1000%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loadingText {
    font-size: large;
  }
`;


function LoadingSpinner({loadingMsg}:any) {

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
  return <StyledSpinnerDiv>
    <StyledSpinner src="/img/loadingspinner.gif" alt='로딩중' />
    <p className="loadingText">{loadingMsg}</p>
  </StyledSpinnerDiv>
}
export default LoadingSpinner