import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  align-items: flex-end;
`;
const LargeBlock = styled.div`
  width: 70%;
  margin-top: 5%;
  height: 80%;
  border: 10px solid black;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #6c76d6;
  /* display: flex; */
`;
const SmallBlock = styled.div`
  width: 80%;
  margin-top: 5%;
  height: 70%;
  border: 10px solid black;
  background-color: #a7ace2;
`;
const GameButton = styled.div`
  width: 70%;
  height: 18%;
  /* border: 2px solid white; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Up = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Down = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const GameBlock = styled.div`
  width: 40%;
  height: 94%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/img/game_main_btn1.png');
  background-repeat: no-repeat;
  background-size: 100%;
  :hover {
    background-image: url('/img/game_main_btn_2.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .img {
    width: 40%;
  }
  /* border: 2px solid white; */
`;
function GameSelectPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LargeBlock>
        <SmallBlock>
          <Up>
            <GameBlock onClick={() => navigate('/game/typing')}>
              <h2>타자게임</h2>
              <img
                className="img"
                src={`/img/langIcon/java_WCom.png`}
                alt="asdfasd"
              />
            </GameBlock>
            <GameBlock onClick={() => navigate('/game/algo')}>
              <h2>알고리즘 배틀</h2>
              <img className="img" src="/img/algoIcon.png" alt="asdfasd" />
            </GameBlock>
          </Up>
          <Down>
            <GameBlock onClick={() => navigate('/game/casino')}>
              <h2>싸피게임</h2>
              <img className="img" src={`/img/coin/head.png`} alt="asdfasd" />
            </GameBlock>
            <GameBlock onClick={() => navigate('/game/cs')}>
              <h2>씨에스 파이트</h2>
              <img className="img" src="/img/questionMark.png" alt="asdfasd" />
            </GameBlock>
          </Down>
        </SmallBlock>
        <GameButton>
          <img src="/img/gamebutton3.png" alt="" />
          <img src="/img/gamebutton1.png" alt="" />
          <img src="/img/gamebutton4.png" alt="" />
        </GameButton>
      </LargeBlock>
    </Wrapper>
  );
}
export default GameSelectPage;
