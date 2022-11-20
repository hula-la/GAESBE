import { MyRecordInterface } from '../../../../models/algo';
import styled from 'styled-components';


const Wrapper = styled.div`
  width:100%;
  table{
    width:47%;
  }
  .problem-btn:hover{
    color : #e2b708;
    cursor: url('/img/cursor/hover_cursor.png'), auto;
  }
  .detail{
    background-color: #2e2e2e;
    border: none;
    padding : 4px 6px;
    color:#fff;
    transition: 0.2s;
  }
  .detail:hover{
    background-color: #e2b708;
    color:#2e2e2e;
    cursor: url('/img/cursor/hover_cursor.png'), auto;
  }
`

const Tr = styled.div`
  width: 210%;
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* border-bottom: 1px solid gray; */
`;
const Th = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Td = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
function AlgoRecordTable({
  records,
  handleDetail,
}: {
  records: MyRecordInterface[];
  handleDetail: any;
}) {
  const language: any = {
    1001: 'c++',
    1002: 'java',
    1003: 'python',
    1004: 'c',
  };

  const handleOpenBj = (problemId: number) => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`);
  };

  return (
    <Wrapper>
      <table>
        <thead>
          <Tr>
            <Th>문제번호</Th>
            <Th>순위</Th>
            <Th>걸린 시간</Th>
            <Th>배틀 날짜</Th>
            <Th>제출 언어</Th>
            <Th>상세보기</Th>
          </Tr>
        </thead>
        <hr style={{ width: '190%', marginLeft: '10%' }} />
        <tbody>
          {records.map((record: MyRecordInterface) => {
            return (
              <Tr key={record.id}>
                <Td>
                  <a className='problem-btn' onClick={() => handleOpenBj(record.problemId)}>
                    {record.problemId}
                  </a>
                </Td>
                <Td>{record.ranking}</Td>
                <Td>{record.solveTime}</Td>
                <Td>{record.date.split('T')[0].replaceAll('-', '.')}</Td>
                <Td>{language[record.lan]}</Td>
                <Td>
                  <button className='detail' onClick={() => handleDetail(record.roomCode)}>
                    상세정보
                  </button>
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}
export default AlgoRecordTable;
