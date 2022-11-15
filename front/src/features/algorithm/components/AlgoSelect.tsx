
import { ProblemInterface } from '../../../models/algo'

import BeforeSolveUsers from './BeforeSolveUsers'
import ProblemInfo from './ProblemInfo'
import styled from 'styled-components'
import '../../../components/Common/retroBtn.css';
const Wrapper = styled.div`
  height: 90%;
  width: 100%;
  margin: auto;
  .user-list{
    padding-top: 2%;
     margin-top:2%;
    height: 35%;
    background-color: #3b3b3b;
    border-radius: 10px;

    background-image: url(/img/background/park.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 121%;
    
  }
  .progressBar{
    height: 10%;
    text-align: center;
  }
  .problem{
    height:45%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .btn{
    margin-top:2%;
    display: flex;
    width: 40%;
  }
  button{
      margin: auto;
      font-family: 'NeoDunggeunmo';
    }

`

function AlgoSelect({ problemList, passProblem, problemIndex, passDisabled, inGameUsers }: any) {

  const nowProblem: ProblemInterface = problemList[problemIndex]

  return <Wrapper>
    <div className='user-list'>
      <BeforeSolveUsers inGameUsers={inGameUsers} />
    </div>
    <div className='progressBar'>progress bar</div>
    
    <div className='problem'>
        <ProblemInfo nowProblem={nowProblem} />
        <div className='btn'>
          <button className="eightbit-btn eightbit-btn--proceed" >문제보기</button>
          <button className="eightbit-btn eightbit-btn--reset" onClick={passProblem} disabled={passDisabled && 'disable'} >패스하기</button>
        </div>
      
    </div>
     
  </Wrapper>
}
export default AlgoSelect