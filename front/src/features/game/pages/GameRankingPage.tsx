import { useEffect, useState } from 'react';
import { allGameRankingRequest } from '../../../api/gameApi';
import RankingInfo from '../components/RankingInfo';
import { RankerInfoInterface } from '../../../models/user';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  .myRankDiv {
    display: flex;
  }
`;

function GameRankingPage() {
  const [myRank, setMyRank] = useState<{
    myAlgoRank: number;
    myCsRank: number;
    myLuckRank: number;
    myTypingRank: number;
  } | null>(null);
  const [nowGame, setNowGame] = useState<string>('algo');
  const [algoRankers, setAlgoRankers] = useState<RankerInfoInterface[]>([]);
  const [CSRankers, setCSRankers] = useState<RankerInfoInterface[]>([]);
  const [luckRankers, setLuckRankers] = useState<RankerInfoInterface[]>([]);
  const [typingRankers, setTypingRankers] = useState<RankerInfoInterface[]>([]);

  useEffect(() => {
    fetchAllGameRanking();
  }, []);
  const fetchAllGameRanking = async () => {
    try {
      const res = await allGameRankingRequest();
      console.log(res);
      if (res.status === 200) {
        setMyRank({
          myAlgoRank: res.data.myAlgoRank,
          myCsRank: res.data.myCsRank,
          myLuckRank: res.data.myLuckRank,
          myTypingRank: res.data.myTypingRank,
        });
        setAlgoRankers(res.data.algo);
        setCSRankers(res.data.cs);
        setLuckRankers(res.data.luck);
        setTypingRankers(res.data.typing);
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: '랭킹정보를 가져오는데 문제가 있습니다 잠시 후 다시 시도해 주세요',
      });
    }
  };
  return (
    <Wrapper>
      <h1>게임별 랭킹 페이지</h1>
      <h2>나의 랭킹</h2>
      <div className="myRankDiv">
        <div>
          <h3>알고리즘</h3>
          <h3>{myRank?.myAlgoRank}위</h3>
        </div>
        <div>
          <h3>cs 게임</h3>
          <h3>{myRank?.myCsRank}위</h3>
        </div>
        <div>
          <h3>타자 게임</h3>
          <h3>{myRank?.myTypingRank}위</h3>
        </div>
        <div>
          <h3>싸피 게임</h3>
          <h3>{myRank?.myLuckRank}위</h3>
        </div>
      </div>
      <div onClick={() => setNowGame('algo')}>알고리즘</div>
      <div onClick={() => setNowGame('cs')}>CS 게임</div>
      <div onClick={() => setNowGame('typing')}>타자 게임</div>
      <div onClick={() => setNowGame('casino')}>싸피 게임</div>
      {nowGame === 'algo' && (
        <RankingInfo type={nowGame} rankersInfo={algoRankers} />
      )}
      {nowGame === 'cs' && (
        <RankingInfo type={nowGame} rankersInfo={CSRankers} />
      )}
      {nowGame === 'typing' && (
        <RankingInfo type={nowGame} rankersInfo={typingRankers} />
      )}
      {nowGame === 'casino' && (
        <RankingInfo type={nowGame} rankersInfo={luckRankers} />
      )}
    </Wrapper>
  );
}
export default GameRankingPage;
