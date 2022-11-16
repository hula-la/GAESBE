import { MyRecordInterface } from '../../../../models/algo';
import styled from 'styled-components';

const Tr = styled.div`
  width: 210%;
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
    <>
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
        <tbody>
          {records.map((record: MyRecordInterface) => {
            return (
              <Tr key={record.id}>
                <Td>
                  <button onClick={() => handleOpenBj(record.problemId)}>
                    {record.problemId}
                  </button>
                </Td>
                <Td>{record.ranking}</Td>
                <Td>{record.solveTime}</Td>
                <Td>{record.date.split('T')[0].replaceAll('-', '.')}</Td>
                <Td>{language[record.lan]}</Td>
                <Td>
                  <button onClick={() => handleDetail(record.roomCode)}>
                    상세정보
                  </button>
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default AlgoRecordTable;
