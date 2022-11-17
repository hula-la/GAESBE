import styled from 'styled-components';

const Tr = styled.div`
  width: 800%;
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

function CSRecordTable({ csList }: any) {
  return (
    <table>
      <thead>
        <Tr>
          <Th>배틀 날짜</Th>
          <Th>순위</Th>
        </Tr>
      </thead>
      <hr style={{ width: '480%', marginLeft: '150%' }} />
      <tbody>
        {csList.map((e: any) => (
          <Tr key={e.csRecordId}>
            <Td>{e.date}</Td>
            <Td>{e.ranks}등</Td>
          </Tr>
        ))}
      </tbody>
    </table>
  );
}
export default CSRecordTable;
