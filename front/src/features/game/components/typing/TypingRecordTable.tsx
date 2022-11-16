function TypingRecordTable({ typingList }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>언어</th>
          <th>순위</th>
        </tr>
      </thead>
      <tbody>
        {typingList.map((e: any) => (
          <tr key={e.typingRecordId}>
            <td>{e.langType}</td>
            <td>{e.ranks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TypingRecordTable;
