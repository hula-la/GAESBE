import { useEffect, useState } from 'react';
import { allGameRankingRequest } from '../../../api/gameApi';
import RankingInfo from '../components/RankingInfo';
import { RankerInfoInterface } from '../../../models/user';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;
const MainHeader = styled.div`
  font-size: 1.5rem;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid red; */
`;
const MyRankingBlock = styled.div`
  width: 100%;
  height: 20%;
  /* border: 2px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyRankingHeader = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  /* border: 2px solid white; */
  .img {
    width: 3%;
    height: 3%;
    position: absolute;
    left: 26%;
    top: 9%;
  }
`;
const MyRankingBody = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 2px solid yellow; */
`;
const MyRankingList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 2px solid purple; */
  div {
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
    h1 {
      font-size: 5rem;
    }
    div {
      font-size: 2rem;
    }
  }
`;
const AllRankingBlock = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 2px solid orange; */
`;
const AllRankingHeader = styled.div`
  display: flex;
  width: 90%;
  height: 15%;
  .img {
    width: 3%;
    height: 3%;
    position: absolute;
    left: 27%;
    top: 29%;
  }
  /* border: 2px solid white; */
`;
const AllRankingList = styled.div`
  width: 100%;
  height: 85%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 2px solid purple; */
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
      // console.log(res);
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
      <MainHeader>
        <h1>🏆개츠비 명예의 전당🏆</h1>
      </MainHeader>
      <MyRankingBlock>
        <MyRankingHeader>
          <img className="img" src="/img/crown.png" alt="asdfasdfasdf" />
          <h2>나의 랭킹</h2>
        </MyRankingHeader>
        <MyRankingBody>
          <MyRankingList>
            <h3>알고리즘</h3>
            <div>
              <h1>{myRank?.myAlgoRank}</h1>
              <div>위</div>
            </div>
          </MyRankingList>
          <MyRankingList>
            <h3>CS 게임</h3>
            <div>
              <h1>{myRank?.myCsRank}</h1>
              <div>위</div>
            </div>
          </MyRankingList>
          <MyRankingList>
            <h3>타자게임</h3>
            <div>
              <h1>{myRank?.myTypingRank}</h1>
              <div>위</div>
            </div>
          </MyRankingList>
          <MyRankingList>
            <h3>싸피게임</h3>
            <div>
              <h1>{myRank?.myLuckRank}</h1>
              <div>위</div>
            </div>
          </MyRankingList>
        </MyRankingBody>
      </MyRankingBlock>
      <AllRankingBlock>
        <AllRankingHeader>
          <img className="img" src="/img/crown.png" alt="asdfasdfasdf" />
          <h2>랭킹 TOP 5</h2>
        </AllRankingHeader>
        <AllRankingList>
          <RankingInfo type={'알고리즘'} rankersInfo={algoRankers} />
          <RankingInfo type={'CS 게임'} rankersInfo={CSRankers} />
          <RankingInfo type={'타자게임'} rankersInfo={typingRankers} />
          <RankingInfo type={'싸피게임'} rankersInfo={luckRankers} />
        </AllRankingList>
      </AllRankingBlock>
      {/* <h1>게임별 랭킹 페이지</h1>
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
      )} */}
    </Wrapper>
  );
}
export default GameRankingPage;
