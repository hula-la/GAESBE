import styled from "styled-components"

const Frame = styled.div`
  width:300px;
  color: black;
  font-size: 1.1rem;
  margin: auto;
  .bg{
    background-image: url(/img/yellow-fill-box.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    /* height: 100%; */
    
    display: flex;
    flex-direction: column;
  }
  .bg > div{
    margin: auto 10%;
  }
  
  /* div{
    border: 1px solid white;
    margin: 4% 10%;
  } */
  .detail{
    display: flex;
    div{
      margin : auto 10px;
    }
    p{
      background-color: #e59400;
      text-align: center;
      color:#fff;
    }
  }
  .title{
    font-size: 1.5rem;
  }
`

function ProblemInfo({nowProblem}:any) {

  return <Frame>
    <div className="bg">
      <p></p>
      <div className="id">No.{nowProblem.problemId}</div>
      <div className="title">{nowProblem.title}</div>
      <div className="detail">
        <div> 
          <p className="submit">제&nbsp;&nbsp;출</p>
          {Number(nowProblem.submit).toLocaleString()}
        </div>
        <div>
          <p className="correct">정&nbsp;&nbsp;답</p>
          {Number(nowProblem.correct).toLocaleString()}
        </div>
        <div>
          <p className="ratio">정답률</p>{nowProblem.ratio}
        </div>
      </div>
      <p className="tag"></p>
    </div>
  </Frame>
}
export default ProblemInfo