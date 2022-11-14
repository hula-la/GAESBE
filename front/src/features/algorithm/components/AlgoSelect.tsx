
import { ProblemInterface } from '../../../models/algo'

import BeforeSolveUsers from './BeforeSolveUsers'
import ProblemInfo from './ProblemInfo'
import styled from 'styled-components'
import '../../../components/Common/retroBtn.css';
const Wrapper = styled.div`
  border: 1px solid yellow;
  height: 10%;
  .user-list{
    border: 1px solid pink;
    height: 30%;
  }
  .btn{
    border: 1px solid pink;

  }
  .problem{
    border: 1px solid pink;

  }
`

function AlgoSelect({ problemList, passProblem, problemIndex, passDisabled, inGameUsers }: any) {

  const nowProblem: ProblemInterface = problemList[problemIndex]

  return <Wrapper>
    <div className='user-list'>
      <BeforeSolveUsers inGameUsers={inGameUsers} />
    </div>
    <div className='prblem'>
    <ProblemInfo nowProblem={nowProblem} />
    <button className="btn eightbit-btn eightbit-btn--reset" onClick={passProblem} disabled={passDisabled && 'disable'} >패스하기</button>
    
    </div>
  </Wrapper>
}
export default AlgoSelect