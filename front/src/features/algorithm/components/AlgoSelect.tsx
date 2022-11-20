import { ProblemInterface } from '../../../models/algo';

import BeforeSolveUsers from './BeforeSolveUsers';
import ProblemInfo from './ProblemInfo';
import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';
const Wrapper = styled.div`
  height: 90%;
  width: 100%;
  margin: auto;
  .user-list {
    padding-top: 2%;
    margin-top: 2%;
    height: 35%;
    background-color: #3b3b3b;
    border-radius: 10px;

    background-image: url(/img/background/park.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 121%;
    /* position: absolute; */
  }

  .progressBar {
    height: 10%;
    text-align: center;
  }
  --duration: 10;

  .progressBar .progress {
    animation: roundtime calc(var(--duration) * 1s) linear forwards;
    animation-iteration-count: infinite;
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

  .problem {
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .btn {
    margin-top: 2%;
    display: flex;
    width: 40%;
  }
  button {
    margin: auto;
    font-family: 'NeoDunggeunmo';
  }
`;

function AlgoSelect({
  problemList,
  passProblem,
  problemIndex,
  passDisabled,
  inGameUsers,
}: any) {
  const nowProblem: ProblemInterface = problemList[problemIndex];

  const handleGoToBj = () => {
    window.open(`https://www.acmicpc.net/problem/${nowProblem.problemId}`);
  };
  return (
    <Wrapper>
      <div className="user-list">
        <BeforeSolveUsers inGameUsers={inGameUsers} />
      </div>

      <div className="progressBar">
        <div className="progress" />
      </div>

      <div className="problem">
        <ProblemInfo nowProblem={nowProblem} />
        <div className="btn">
          <button
            className="eightbit-btn eightbit-btn--proceed"
            onClick={handleGoToBj}
          >
            문제보기
          </button>
          <button
            className={passDisabled? "eightbit-btn eightbit-btn--disable":"eightbit-btn eightbit-btn--reset"}
            onClick={passProblem}
            disabled={passDisabled && 'disable'}
          >
            패스하기
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
export default AlgoSelect;