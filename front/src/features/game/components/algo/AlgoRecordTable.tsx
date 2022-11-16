import { MyRecordInterface } from '../../../../models/algo';

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
          <tr>
            <th>문제번호</th>
            <th>순위</th>
            <th>걸린 시간</th>
            <th>배틀 날짜</th>
            <th>제출 언어</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: MyRecordInterface) => {
            return (
              <tr key={record.id}>
                <td>
                  {record.problemId}
                  <button onClick={() => handleOpenBj(record.problemId)}>
                    문제보러가기
                  </button>
                </td>
                <td>{record.ranking}</td>
                <td>{record.solveTime}</td>
                <td>{record.date.split('T')[0].replaceAll('-', '.')}</td>
                <td>{language[record.lan]}</td>
                <td>
                  <button onClick={() => handleDetail(record.roomCode)}>
                    상세정보
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default AlgoRecordTable;
