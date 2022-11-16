function CSRecordTable({ csList }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>배틀 날짜</th>
          <th>순위</th>
        </tr>
      </thead>
      <tbody>
        {csList.map((e: any) => (
          <tr key={e.csRecordId}>
            <td>{e.date}</td>
            <td>{e.ranks}등</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default CSRecordTable;
