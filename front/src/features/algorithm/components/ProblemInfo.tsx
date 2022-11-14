import styled from "styled-components"

const Frame = styled.div`
  .bg{
    background-image: url(/img/yellow-fill-box.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    
  }
  p{
    border: 1px solid white;
  }
  /* .id{

  }
  .title{

  }
  .submit{

  }
  .correct{
    
  } */
`

function ProblemInfo({nowProblem}:any) {

  return <Frame>
    <div className="bg">
      <span className="id">문제 번호: {nowProblem.problemId}</span>
      <span className="title">문제 제목: {nowProblem.title}</span>
      <span className="submit">제출 수: {Number(nowProblem.submit).toLocaleString()}</span>
      <span className="correct">정답 수: {Number(nowProblem.correct).toLocaleString()}</span>
      <span className="ratio">정답률: {nowProblem.ratio}</span>
      <span className="tag">{nowProblem.tag}</span>
    </div>
  </Frame>
}
export default ProblemInfo