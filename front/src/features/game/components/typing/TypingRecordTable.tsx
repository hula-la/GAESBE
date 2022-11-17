import styled from 'styled-components';

const Tr = styled.div`
  width: 490%;
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

function TypingRecordTable({ typingList }: any) {
  return (
    <table>
      <thead>
        <Tr>
          <Th>배틀 날짜</Th>
          <Th>언어</Th>
          <Th>타수</Th>
          <Th>순위</Th>
        </Tr>
      </thead>
      <tbody>
        {typingList.map((e: any) => (
          <Tr key={e.typingRecordId}>
            <Td>{e.date}</Td>
            <Td>{e.langType}</Td>
            <Td>{e.typeSpeed}</Td>
            <Td>{e.ranks}</Td>
          </Tr>
        ))}
      </tbody>
    </table>
  );
}
export default TypingRecordTable;
