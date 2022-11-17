import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

import { myRecordRankRequest, myRecordRequest } from '../../../api/gameApi';
import { gameActions } from '../gameSlice';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import AlgoRecordTable from '../components/algo/AlgoRecordTable';
import DetailResultModal from '../components/DetailResultModal';
import CSRecordTable from '../components/cs/CSRecordTable';
import TypingRecordTable from '../components/typing/TypingRecordTable';

const MyPageContainer = styled.div`
  width: 100%;
  height: 99%;
  color: white;
  background-color: #232323;
  /* border: 2px solid red; */
`;
const Up = styled.div`
  width: 100%;
  height: 30%;
  /* border: 2px solid blue; */
  display: flex;
  flex-direction: row;
`;
const MyCharacter = styled.div`
  // border: 2px solid blue;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 35%;
  }
`;
const UserBotton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const MyRecord = styled.div`
  /* margin-top: %; */
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Down = styled.div`
  /* border: 2px solid yellow; */
  margin-top: 5%;
  margin-left: 7%;
  width: 70%;
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .gametypealgo {
    /* border: 2px solid orange; */
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    color: white;
    :hover {
      background-color: orange;
    }
  }
  .gametypecs {
    /* border: 2px solid orange; */
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    color: white;
  }
  .gametypetyping {
    /* border: 2px solid orange; */
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    color: white;
  }
  .gametypessafy {
    /* border: 2px solid orange; */
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    color: white;
  }
`;
const GameType = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const MyPower = styled.div`
  width: 85%;
  height: 40%;
  margin-left: 7%;
  border: 5px solid orange;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  // background-color: orange;
`;
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);
  const { record } = useSelector((state: any) => state.game);

  const [gameType, setGameType] = useState<string>('algo');
  const [csrecord, setCsRecord] = useState<any>(null);
  const [typingrecord, setTypingRecord] = useState<any>(null);
  const [algoRecordRank, setAlgoRecordRank] = useState<number>(0);
  const [algoRecords, setAlgoRecords] = useState([]);
  const [detailModal, setDetailModal] = useState<string>('');
  const [algoDetailRoomCode, setAlgoDetailRoomCode] = useState<string>('');
  // console.log(algoRecord, 'zzzzzzzzzzzzzzzzzzzzzzzzzz');
  useEffect(() => {
    if (record) {
      setCsRecord(record.cs.content);
      setTypingRecord(record.typing.content);
    }
  }, [record]);

  useEffect(() => {
    dispatch(gameActions.fetchRecordStart());
    fetchAlgoRecordRank();
    fetchAlgoRecord();
  }, []);
  const fetchAlgoRecord = async () => {
    try {
      const res = await myRecordRequest();
      if (res.status === 200) {
        setAlgoRecords(res.data.content);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: '알고리즘 배틀 정보를 못가져왔습니다' });
    }
  };
  const fetchAlgoRecordRank = async () => {
    try {
      const res = await myRecordRankRequest();
      if (res.status === 200) {
        setAlgoRecordRank(res.data);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: '알고리즘 배틀 정보를 못가져왔습니다' });
    }
  };

  let csList: Array<any> = csrecord;
  let typingList: Array<any> = typingrecord;

  const handleDelete = () => {
    Swal.fire({
      title: '진짜?',
      text: '정말 삭제할거ㅂ니까?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '아니오',
      focusCancel: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: '네!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.deleteUserInfoStart());
        navigate('/login');
        console.log('지금 유저 인포', userInfo);
        // 유저 인포 널로 바꾸고
        // 엑세스 토큰 지우고
      } else {
        Swal.fire({ icon: 'info', text: '삭제 안함' });
      }
    });
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
                className="img"
                src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
                alt="asdf"
              />
              <UserBotton>
                <button onClick={handleChange}>정보 수정</button>
                <button onClick={handleDelete}>회원 탈퇴</button>
              </UserBotton>
            </MyCharacter>
            <MyRecord>
              <GameType>
                <h2>알고리즘 1등</h2>
                <br />
                <br />
                <br />
                <div>{algoRecordRank} 회</div>
              </GameType>
              <GameType>
                <h2>CS게임 1등</h2>
                <br />
                <br />
                <br />
                <div>회</div>
              </GameType>
              <GameType>
                <h2>타자게임 1등</h2>
                <br />
                <br />
                <br />
                <div>회</div>
              </GameType>
              <GameType>
                <h2>싸피게임 최대연승</h2>
                <br />
                <br />
                <br />
                <div>회</div>
              </GameType>
            </MyRecord>
          </Up>
          <Down>
            <div className="gametypealgo" onClick={clickAlgoGame}>
              알고리즘
            </div>
            <div className="gametypecs" onClick={clickCsGame}>
              CS 게임
            </div>
            <div className="gametypetyping" onClick={clickTypingGame}>
              타자 게임
            </div>
            <div className="gametypessafy" onClick={clickSsafyGame}>
              싸피 게임
            </div>
          </Down>
          <MyPower>
            <div>
              {/* <h1>{userInfo.nickname}님의 최근 전적</h1> */}
              {gameType === 'algo' && (
                <div>
                  {/* <h1>알고리즘</h1> */}
                  {detailModal === 'algo' && (
                    <DetailResultModal
                      handleModal={handleCloseModal}
                      algoDetailRoomCode={algoDetailRoomCode}
                    />
                  )}
                  <AlgoRecordTable
                    records={algoRecords}
                    handleDetail={(roomCode: string) => {
                      handleDetailAlgo(roomCode);
                    }}
                  />
                </div>
              )}
              {gameType === 'cs' && (
                <div>
                  {/* <h1>CS</h1> */}
                  <CSRecordTable csList={csList} />
                </div>
              )}
              {gameType === 'typing' && (
                <div>
                  {/* <h1>TYPING</h1> */}
                  <TypingRecordTable typingList={typingList} />
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
