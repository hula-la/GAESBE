import styled from 'styled-components';

const Tr = styled.div`
  /* border: 2px solid red; */
  width: 700%;
  margin-top: 10%;
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

function SsafyRecordTable({ ssafyList }: any) {
  return (
    <table>
      <thead>
        <Tr>
          <Th>배틀 날짜</Th>
          <Th>결과</Th>
        </Tr>
      </thead>
      <hr style={{ width: '600%', marginLeft: '50%' }} />
      <tbody>
        {ssafyList.map((e: any) => (
          <Tr key={e.ssafyRecordId}>
            <Td>{e.date}</Td>
            <Td>{e.correct === true ? <div>성공</div> : <div>실패</div>}</Td>
          </Tr>
        ))}
      </tbody>
    </table>
  );
}
export default SsafyRecordTable;
