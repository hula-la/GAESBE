import {MyRecordInterface} from '../../../models/algo'

function AlgoRecordListItem({ record, handleDetail }: {record:MyRecordInterface, handleDetail:any}) {
  const language: any = {
    1001: 'c++',
    1002: 'java',
    1003: 'python',
    1004: 'c',
  };

  const handleOpenBj = () => {
    window.open(`https://www.acmicpc.net/problem/${record.problemId}`);
  }


  return (
    <>
      <p>문제 번호 : {record.problemId}</p>
      <button onClick={handleOpenBj}>문제보러가기</button>
      <p>순위 : {record.ranking}</p>
      <p>걸린 시간 : {record.solveTime}</p>
      <p>배틀 날짜 : {record.date.split('T')[0]}</p>
      <p>제출 언어 : {language[record.lan]}</p>
      <button onClick={()=>handleDetail(record.roomCode)}>상세정보</button>
    </>
  );
}
export default AlgoRecordListItem;
