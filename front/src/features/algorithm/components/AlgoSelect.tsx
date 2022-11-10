
import { ProblemInterface } from '../../../models/algo'

import BeforeSolveUsers from './BeforeSolveUsers'
import ProblemInfo from './ProblemInfo'

function AlgoSelect({ problemList, passProblem, problemIndex, passDisabled, inGameUsers }: any) {

  const nowProblem: ProblemInterface = problemList[problemIndex]

  return <>
    <h2>문제 선택 컴포넌트</h2>
    
    <BeforeSolveUsers inGameUsers={inGameUsers} />
    <button onClick={passProblem} disabled={passDisabled && 'disable'}>패스하기</button>
    <ProblemInfo nowProblem={nowProblem} />
  </>
}
export default AlgoSelect