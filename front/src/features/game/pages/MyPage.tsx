import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

import { myRecordRankRequest, myRecordRequest } from '../../../api/gameApi';
import { MyRecordInterface } from '../../../models/algo';
import AlgoRecordTable from '../components/algo/AlgoRecordTable';
import DetailResultModal from '../components/DetailResultModal';

const MyPageContainer = styled.div`
  width: 66%;
  color: white;
  background-color: #232323;
  border: 2px solid red;
  // display: flex;
  // flex-direction: row;
`;
const Up = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyCharacter = styled.div`
  // border: 2px solid blue;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserBotton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const MyRecord = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Down = styled.div`
  margin-top: 5%;
  margin-left: 7%;
  width: 70%;
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .gametype {
    border: 2px solid orange;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: orange;
    color: black;
  }
`;
const MyPower = styled.div`
  width: 85%;
  height: 50%;
  margin-left: 7%;
  border: 5px solid orange;
  // background-color: orange;
`;
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gameType, setGameType] = useState<string>('algo');
  const { userInfo } = useSelector((state: any) => state.auth);
  const { record } = useSelector((state: any) => state.game);
  const [csrecord, setCsRecord] = useState<any>(null);
  const [typingrecord, setTypingRecord] = useState<any>(null);
  const [algoRecord, setAlgoRecord] = useState({ rank: 0, records: [] });
  const [detailModal, setDetailModal] = useState<string>('');
  const [algoDetailRoomCode, setAlgoDetailRoomCode] = useState<string>('');

  useEffect(() => {
    if (record) {
      setCsRecord(record.cs.content);
      setTypingRecord(record.typing.content);
    }
  }, [record]);

  useEffect(() => {
    fetchAlgoRecordRank();
    fetchAlgoRecord();
  }, []);

  const fetchAlgoRecord = async () => {
    try {
      const res = await myRecordRequest();
      if (res.status === 200) {
        setAlgoRecord({ ...algoRecord, records: res.data.content });
      }
    } catch (error) {
      alert('알고리즘 배틀 정보를 못가져왔습니다');
    }
  };

  const fetchAlgoRecordRank = async () => {
    try {
      const res = await myRecordRankRequest();
      if (res.status === 200) {
        setAlgoRecord({ ...algoRecord, rank: res.data });
      }
    } catch (error) {
      alert('알고리즘 배틀 정보를 못가져왔습니다');
    }
  };

  let csList: Array<any> = csrecord;
  let typingList: Array<any> = typingrecord;

  const handleDelete = () => {
    var deleteConfirm = window.confirm('정말 삭제할거?');
    if (deleteConfirm) {
      dispatch(authActions.deleteUserInfoStart());
      navigate('/login');
      console.log('지금 유저 인포', userInfo);
      // 유저 인포 널로 바꾸고
      // 엑세스 토큰 지우고
    } else {
      alert('삭제 안함');
    }
  };
  const handleChange = () => {
    navigate('change');
  };
  const clickAlgoGame = () => {
    setGameType('algo');
  };
  const clickCsGame = () => {
    setGameType('cs');
  };
  const clickTypingGame = () => {
    setGameType('typing');
  };
  const clickSsafyGame = () => {
    setGameType('ssafy');
  };
  const handleDetailAlgo = (roomCode: string) => {
    setDetailModal('algo');
    setAlgoDetailRoomCode(roomCode);
  };
  const handleCloseModal = () => {
    setDetailModal('');
    setAlgoDetailRoomCode('');
  };
  return (
    <MyPageContainer>
      {userInfo && (
        <>
          <Up>
            <MyCharacter>
              <h1>{userInfo.nickname}</h1>
              <img
                // src={`/img/rank/character${userInfo.profileChar}.png`}
                src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
                alt="asdf"
              />
              <UserBotton>
                <button onClick={handleChange}>정보 수정</button>
                <button onClick={handleDelete}>회원 탈퇴</button>
              </UserBotton>
            </MyCharacter>
            <MyRecord>
              <div className="gametype">알고리즘 1등 {algoRecord.rank} 회</div>
              <div className="gametype">CS게임 1등</div>
              <div className="gametype">타자게임 1등</div>
              <div className="gametype">싸피게임 최대연승</div>
            </MyRecord>
          </Up>
          <Down>
            <div className="gametype" onClick={clickAlgoGame}>
              알고리즘
            </div>
            <div className="gametype" onClick={clickCsGame}>
              CS 게임
            </div>
            <div className="gametype" onClick={clickTypingGame}>
              타자 게임
            </div>
            <div className="gametype" onClick={clickSsafyGame}>
              싸피 게임
            </div>
          </Down>
          <MyPower>
            <div>
              <h1>{userInfo.nickname}님의 최근 전적</h1>
              {gameType === 'algo' && (
                <div>
                  <h1>알고리즘</h1>
                  {detailModal === 'algo' && (
                    <DetailResultModal
                      handleModal={handleCloseModal}
                      algoDetailRoomCode={algoDetailRoomCode}
                    />
                  )}
                  <AlgoRecordTable
                    records={algoRecord.records}
                    handleDetail={(roomCode: string) => {
                      handleDetailAlgo(roomCode);
                    }}
                  />
                </div>
              )}
              {gameType === 'cs' && (
                <div>
                  <h1>CS</h1>
                  {csList.map((e: any) => (
                    <div>
                      <div>{e.date}</div>
                      <div>{e.ranks}등</div>
                    </div>
                  ))}
                </div>
              )}
              {gameType === 'typing' && (
                <div>
                  <h1>TYPING</h1>
                  {typingList.map((e: any) => (
                    <div>
                      <div>{e.ranks}</div>
                    </div>
                  ))}
                </div>
              )}
              {gameType === 'ssafy' && <div>싸피</div>}
            </div>
          </MyPower>
        </>
      )}
    </MyPageContainer>
  );
};

export default MyPage;
