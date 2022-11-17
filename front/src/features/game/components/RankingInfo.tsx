import { RankerInfoInterface } from '../../../models/user';
function RankingInfo({ type, rankersInfo }: any) {
  return (
    <>
      <h1>{type}</h1>
      <table>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>레벨</th>
            <th>경험치</th>
          </tr>
        </thead>
        <tbody>
          {rankersInfo.map((rankerInfo: RankerInfoInterface, index: number) => {
            return (
              <tr key={index}>
                <td>{rankerInfo.nickName}</td>
                <td>{rankerInfo.lv}</td>
                <td>{rankerInfo.exp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default RankingInfo;
