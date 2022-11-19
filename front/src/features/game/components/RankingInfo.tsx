import styled from 'styled-components';
import Background from '../../../components/Layout/Background';
import { RankerInfoInterface } from '../../../models/user';

const GameType = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;
const GameHeader = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  .img {
    width: 20%;
    height: 30%;
    position: relative;
    left: 70%;
    top: 0%;
  }
`;
const GameTable = styled.div`
  display: flex;
  width: 100%;
  height: 75%;
  border: 5px solid black;
  border-radius: 15px;
  /* background-color: orange; */
  background-color: #ffc02d;
  .table {
    width: 100%;
    height: 100%;
    /* border: 2px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .thead {
      width: 100%;
      height: 20%;
      display: flex;
      align-items: center;
      .tr {
        padding-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        color: black;
      }
    }
    .tbody {
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .tr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 15%;
        border: 3px solid black;
        border-radius: 10px;
        color: black;
        .td1 {
          width: 10%;
          display: flex;
          justify-content: center;
          .img {
            width: 150%;
            height: 150%;
            padding-left: 30%;
          }
        }
        .td2 {
          width: 50%;
          display: flex;
          justify-content: center;
        }
        .td3 {
          display: flex;
          width: 30%;
          justify-content: center;
        }
        .td4 {
          display: flex;
          justify-content: center;
          width: 10%;
        }
      }
    }
  }
`;
function RankingInfo({ type, rankersInfo }: any) {
  // console.log(type, 'aaaaaaaaaaaaaaaaaaaaaaaddddddd');
  let background = '';
  return (
    <GameType>
      <GameHeader>
        <img className="img" src="/img/crown.png" alt="asdfasdfasdf" />
        <h2>{type} 랭킹</h2>
      </GameHeader>
      <GameTable>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="td1">랭킹</th>
              <th className="td2">닉네임</th>
              <th className="td3">레벨</th>
              <th className="td4">경험치</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {rankersInfo.map(
              (rankerInfo: RankerInfoInterface, index: number) => {
                if (index === 0) {
                  background = '#f0568c';
                } else if (index === 1) {
                  background = '#ff98bc';
                } else if (index === 2) {
                  background = '#FFCFE0';
                } else {
                  background = 'white';
                }
                return (
                  index <= 4 && (
                    <tr
                      className="tr"
                      key={index}
                      style={{ backgroundColor: `${background}` }}
                    >
                      <td className="td1">
                        {index <= 2 ? (
                          <img
                            className="img"
                            src={`/img/rank${index + 1}.png`}
                            alt={`${index + 1}`}
                          />
                        ) : (
                          <div>{index + 1}</div>
                        )}
                      </td>
                      <td className="td2">{rankerInfo.nickName}</td>
                      <td className="td3">Lv.{rankerInfo.lv}</td>
                      <td className="td4">{rankerInfo.exp}</td>
                    </tr>
                  )
                );
              },
            )}
          </tbody>
        </table>
      </GameTable>
    </GameType>
  );
}
export default RankingInfo;
