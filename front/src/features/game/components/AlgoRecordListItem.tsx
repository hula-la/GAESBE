function AlgoRecordListItem({ record }: any) {
  const language: any = {
    '1001': 'c++',
    '1002': 'java',
    '1003': 'python',
    '1004': 'c',
  };
  return (
    <>
      <p>문제 번호 : {record.problemId}</p>
      <p>걸린 시간 : {record.solveTime}</p>
      <p>배틀 날짜 : {record.date}</p>
      <p>제출 언어 : {language[String(record.lan)]}</p>
    </>
  );
}
export default AlgoRecordListItem;
