


function AlgoSelect({ problemList, passProblem, problemIndex }: any) {
  console.log(problemList)
  console.log(problemList[problemIndex])
  return<>
    <h2>문제 선택 컴포넌트</h2>
    <button onClick={passProblem}>패스하기</button>
  </>
}
export default AlgoSelect