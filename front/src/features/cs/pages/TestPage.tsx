import React from 'react';
import styled from 'styled-components';
import CSMiddleChart from '../components/CSMiddleChart';

const Test = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  --duration: 5;

  .problemBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .progressContainer .progress {
    animation: roundtime calc(var(--duration) * 1s) linear forwards;
    transform-origin: left center;
  }

  @keyframes roundtime {
    to {
      transform: scaleX(0);
    }
  }

  .progress {
    background: orange;
    height: 100%;
    /* width: 100%; */
    text-align: right;
    font: bold 12px arial;
    border-right: 1px silver solid;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    line-height: 30px;
    color: #444;
    /* -webkit-transition: width 5s linear; For Safari 3.1 to 6.0 */
    /* transition: width 5s linear; */
  }
  .progressContainer {
    width: 100%;
    margin: 0 auto;
    height: 30px;
    border: 1px silver solid;
    border-radius: 4px;
    background: white;
  }
  .problem {
    box-sizing: border-box;
    width: 60%;
    max-height: 35%;
    background: #ffffff;
    border: 5px solid #000000;
    box-shadow: 5px 5px 0px 4px #000000, 4px 4px 0px 7px #ffffff;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* &:after{
      content: "";
      display: block;
      height: 1rem;
      width: 100%;
    } */
    .problemContent {
      margin: 1rem;
      position: relative;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #2f3542;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
      }
    }
    .question {
      font-size: larger;
      font-weight: bold;
    }
    .problemNumber {}
    .example {
      margin: 0.5rem 0;
    }
    .answer {
      color: #0ac413;
    }
  }
  .selectbuttons {
    display: flex;
    width: 60%;
    margin-top: 1rem;
    justify-content: space-around;
  }
  .selectbutton {
    cursor: pointer;

    transition: transform 0.3s;

    :hover {
      transform: scale(1.05);

      cursor: url('/img/cursor/hover_cursor.png'), auto;
    }
  }
  .rankBlock {
    margin-top: 1rem;
    display: flex;
    width: 80%;
    height: 20%;
    position: relative;
  }
  .rankwrapper {
    margin-right: 1rem;
    display: flex;
    width: 25%;
    color: #ffffff;

    &.myRankWrapper {
      position: absolute;
      right: -10%;
    }
    .medal {
      height: 70%;
    }

    .myRank {
      font-size: 2rem;
      padding-right: 0 0.5rem;
      span {
        font-size: 1rem;
      }
    }
  }
  .characterBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .myCharacter {
      right: 0;
      position: absolute;
    }

    .character {
      width: 100%;
    }
    .playerNickName {
      display: flex;
      flex-direction: column;
    }
  }
  .middleText {
    color: #ffffff;
  }

  .chart {
    width: 60%;
    border: 5px solid #000000;
  }
`;

const TestPage = () => {
  const problem = {
    id: 43,
    category: 'DB',
    question: '제1정규형에서 제2정규형 수행 시 작업으로 옳은 것은?',
    type: 'MULTICHOICE',
    example:
      '이행적 함수 종속성 제거|다치 종속 제거|모든 결정자가 후보 키가 되도록 분해|부분 함수 종속성 제거',
    img: null,
    answer: 4,
  };
  const solveOrder = { '5': 1 };
  const answerButton = [1, 2, 3, 4];
  const ranking = [[5, 'king', 22, 0]];
  const myScore = [5, 'king', 22, 0];
  const myRanking = 1;

  return (
    <Test>
      <div className="problemBox">
        <div className="problem">
          <div className="progressContainer">
            <div className="progress"> </div>
          </div>
          <div className="problemContent">
            <div className="question">
              <span className='problemNumber'>1</span> {problem.question}
            </div>
            <div>
              {problem.example.split('|').map((k: String, v: number) => (
                <div className="example">
                  {v + 1}. {k}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="selectbuttons">
          {answerButton.map((answer, idx) => {
            return (
              <img
                key={idx}
                className="selectbutton"
                // onClick={(e) => handleAnswerSend(e, answer)}
                src={`/img/selectbutton/button${answer}.png`}
              />
            );
          })}
        </div>
        <div className="rankBlock">
          {ranking &&
            ranking.slice(0, 3).map((rank: any, idx: number) => {
              return (
                <div key={idx} className="rankwrapper">
                  <img className="medal" src={`/img/rank/medal${idx}.png`} />
                  <div className="characterBox">
                    <img
                      className="character"
                      src={`${process.env.REACT_APP_S3_URL}/profile/${rank[2]}_normal.gif`}
                    />
                    <div className="playerNickName">
                      <div>{rank[1]}</div>
                      <div>{rank[3]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          {myScore && (
            <div className="rankwrapper myRankWrapper">
              <div className="myRank">
                {myRanking + 1}
                <span>등</span>
              </div>

              <div className="characterBox myCharacter">
                <img
                  className="character"
                  src={`${process.env.REACT_APP_S3_URL}/profile/${myScore[2]}_normal.gif`}
                  alt="profile"
                />
                <div className="playerNickName">
                  <div>{myScore[1]}</div>
                  <div>{myScore[3]}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="problemBox">
        <div className="problem">
          <div className="problemContent">
            <div className="question">{problem.question}</div>
            <div>
              {problem.example.split('|').map((k: String, v: number) => (
                <div
                  className={
                    'example' + (v + 1 === problem.answer ? ' answer' : '')
                  }
                >
                  {v + 1}. {k}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chart">
          <CSMiddleChart />
        </div>
        {solveOrder && solveOrder[5] === -1 && (
          <div className="middleText">틀렸습니다ㅜ</div>
        )}
        {solveOrder && solveOrder[5] === 0 && (
          <div className="middleText">시간초과입니다ㅜ</div>
        )}
        {solveOrder && solveOrder[5] > 0 && (
          <div className="middleText">
            {solveOrder[5]}등으로 정답을 맞추셨습니다!
          </div>
        )}
      </div> */}
    </Test>
  );
};

export default TestPage;
