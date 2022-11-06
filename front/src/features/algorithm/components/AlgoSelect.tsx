
import { ProblemInterface } from '../../../models/algo'


function AlgoSelect({ problemList, passProblem, problemIndex }: any) {

  const nowProblem: ProblemInterface = problemList[problemIndex]

  return <>
    <h2>문제 선택 컴포넌트</h2>
    <button onClick={passProblem}>패스하기</button>
    <p>문제 번호: {nowProblem.problemId}</p>
    <p>문제 제목: {nowProblem.title}</p>
    <p>제출 수: {nowProblem.submit}</p>
    <p>정답 수: {nowProblem.correct}</p>
    <p>정답률: {nowProblem.ratio}</p>
    <p>{nowProblem.tag}</p>
  </>
}
export default AlgoSelect