import React from 'react';
import styled from 'styled-components';
import CSMiddleChart from '../components/CSMiddleChart';

const Test = styled.div`
  .middleWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .problem {
      box-sizing: border-box;
      width: 60%;
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
      /* justify-content: space-between; */
      .question {
        /* margin: 2rem 0; */
        font-size: larger;
        font-weight: bold;
        /* margin-bottom: 2rem; */
      }
      .example {
        margin: 0.5rem 0;
      }
      .answer {
        color: #0ac413;
      }
    }
    .problemBox2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3rem;
    }
  }
  .chart {
    width: 60%;
    margin-top: 5rem;
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

  return (
    <Test>
      <div className="middleWrapper">
        <div className="problemBox2">
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
        </div>
        <div className="chart">
          <CSMiddleChart />
        </div>
        {/* <div>
          <div>답 : {answer}</div>
          <div>고른 비율</div>
          {cntPerNum &&
            Object.keys(cntPerNum).map((num: any, idx: number) => {
              return <div key={idx}>{cntPerNum[num]}</div>;
            })}
          {}
        </div> */}
      </div>
    </Test>
  );
};

export default TestPage;
