

function ProblemInfo({nowProblem}:any) {

  return <>
      <p>문제 번호: {nowProblem.problemId}</p>
      <p>문제 제목: {nowProblem.title}</p>
      <p>제출 수: {Number(nowProblem.submit).toLocaleString()}</p>
      <p>정답 수: {Number(nowProblem.correct).toLocaleString()}</p>
      <p>정답률: {nowProblem.ratio}</p>
      <p>{nowProblem.tag}</p>
  </>
}
export default ProblemInfo