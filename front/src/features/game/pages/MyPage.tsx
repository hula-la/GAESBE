import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

import {
  myRecordRankRequest,
  myRecordRequest,
  myCsWinRequest,
  myTypingWinRequest,
  mySsafyRecordRequest,
  mySsafyWinRequest,
} from '../../../api/gameApi';
import { gameActions } from '../gameSlice';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import AlgoRecordTable from '../components/algo/AlgoRecordTable';
import DetailResultModal from '../components/DetailResultModal';
import CSRecordTable from '../components/cs/CSRecordTable';
import TypingRecordTable from '../components/typing/TypingRecordTable';
import SsafyRecordTable from '../components/ssafy/SsafyRecordTable';
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
  margin-top: 2%;
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const WhiteBox = styled.div`
  position: absolute;
  width: 10%;
  height: 7%;
  // algo
  /* left: 22.5%; */
  // cs
  /* left: 38%; */
  // 타자
  /* left: 53%; */
  // 싸피
  /* left: 68.95%; */
  background-color: white;
  /* z-index: -1; */
  /* border: 2px solid red; */
`;
const Down = styled.div`
  /* border: 2px solid yellow; */
  margin-top: 10%;
  margin-left: 7%;
  width: 88%;
  /* width: 70%; */
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  div {
    :hover {
      cursor: url('/img/cursor/hover_cursor.png'), auto;
    }
  }
  .gametypealgo {
    /* border: 2px solid orange; */
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    z-index: 1;
    /* :hover {
      background-color: orange;
    } */
  }
  .gametypecs {
    /* border: 2px solid orange; */
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .gametypetyping {
    /* border: 2px solid orange; */
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    z-index: 1;
  }
  .gametypessafy {
    /* border: 2px solid orange; */
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: orange; */
    z-index: 1;
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
  border: 1rem solid white;
  box-shadow: 0.2rem 0.2rem 0.2rem 0.2rem #6f43ff;
  /* border-radius: 5px; */
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
  const [typingWinNum, setTypingWinNum] = useState<number>(0);
  const [csWinNum, setCsWinNum] = useState<number>(0);
  const [ssafyWinNum, setSsafyWinNum] = useState<number>(0);
  const [algoRecords, setAlgoRecords] = useState([]);
  const [ssafyRecords, setSsafyRecords] = useState<any>(null);
  const [detailModal, setDetailModal] = useState<string>('');
  const [algoDetailRoomCode, setAlgoDetailRoomCode] = useState<string>('');
  const [left, setLeft] = useState<any>('22.5%');
  const [algocolor, setAlgoColor] = useState<any>('black');
  const [cscolor, setCsColor] = useState<any>('white');
  const [typingcolor, setTypingColor] = useState<any>('white');
  const [ssafycolor, setSsafyColor] = useState<any>('white');
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
    fetchTypingWin();
    fetchCsWin();
    fetchMySsafyRecord();
    fetchSsafyWin();
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
  const fetchTypingWin = async () => {
    try {
      const res = await myTypingWinRequest();
      if (res.status === 200) {
        setTypingWinNum(res.data);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: '타이핑 게임 정보를 못가져왔습니다' });
    }
  };
  const fetchCsWin = async () => {
    try {
      const res = await myCsWinRequest();
      if (res.status === 200) {
        setCsWinNum(res.data);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'CS 게임 정보를 못가져왔습니다' });
    }
  };
  const fetchMySsafyRecord = async () => {
    try {
      const res = await mySsafyRecordRequest();
      // console.log(res);
      if (res.status === 200) {
        setSsafyRecords(res.data.content);
        // console.log(res.data.content, '싸피ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ');
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: '싸피게임 정보를 못가져왔습니다' });
    }
  };
  const fetchSsafyWin = async () => {
    try {
      const res = await mySsafyWinRequest();
      if (res.status === 200) {
        setSsafyWinNum(res.data);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: '싸피게임 정보를 못가져왔습니다' });
    }
  };

  let csList: Array<any> = csrecord;
  let typingList: Array<any> = typingrecord;
  let ssafyList: Array<any> = ssafyRecords;
  const handleDelete = () => {
    Swal.fire({
      title: '진짜?',
      text: '가지마유😥',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '아니오',
      focusCancel: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: '네!',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('컨펌함');
        dispatch(authActions.deleteUserInfoStart());
        navigate('/login');
        // console.log('지금 유저 인포', userInfo);
        // 유저 인포 널로 바꾸고
        // 엑세스 토큰 지우고
      } else {
        Swal.fire({ icon: 'info', text: '다행이에요😀' });
      }
    });
  };
  const handleChange = () => {
    navigate('change');
  };
  const clickAlgoGame = () => {
    setGameType('algo');
    setLeft('22.5%');
    setAlgoColor('black');
    setCsColor('white');
    setTypingColor('white');
    setSsafyColor('white');
  };
  const clickCsGame = () => {
    setGameType('cs');
    setLeft('38%');
    setCsColor('black');
    setAlgoColor('white');
    setTypingColor('white');
    setSsafyColor('white');
  };
  const clickTypingGame = () => {
    setGameType('typing');
    setLeft('53%');
    setTypingColor('black');
    setAlgoColor('white');
    setCsColor('white');
    setSsafyColor('white');
  };
  const clickSsafyGame = () => {
    setGameType('ssafy');
    setLeft('68.95%');
    setSsafyColor('black');
    setAlgoColor('white');
    setCsColor('white');
    setTypingColor('white');
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
                <a
                  href="javascript:void(0)"
                  className="eightbit-btn"
                  onClick={handleChange}
                >
                  정보 수정
                </a>
                <a
                  href="javascript:void(0)"
                  className="eightbit-btn eightbit-btn--reset"
                  onClick={handleDelete}
                >
                  회원 탈퇴
                </a>
                {/* <button onClick={handleChange}>정보 수정</button>
                <button onClick={handleDelete}>회원 탈퇴</button> */}
              </UserBotton>
            </MyCharacter>
            <MyRecord>
              <GameType>
                <h2>알고리즘 1등</h2>
                <br />
                <br />
                <h1>{algoRecordRank} 회</h1>
              </GameType>
              <GameType>
                <h2>CS게임 1등</h2>
                <br />
                <br />
                <h1>{csWinNum}회</h1>
              </GameType>
              <GameType>
                <h2>타자게임 1등</h2>
                <br />
                <br />
                <h1>{typingWinNum}회</h1>
              </GameType>
              <GameType>
                <h2>싸피게임 최대연승</h2>
                <br />
                <br />
                <h1>{ssafyWinNum}회</h1>
              </GameType>
            </MyRecord>
          </Up>
          <Down>
            <WhiteBox style={{ left: `${left}` }}></WhiteBox>
            <div
              style={{ color: `${algocolor}` }}
              className="gametypealgo"
              onClick={clickAlgoGame}
            >
              알고리즘
            </div>
            <div
              style={{ color: `${cscolor}` }}
              className="gametypecs"
              onClick={clickCsGame}
            >
              CS 게임
            </div>
            <div
              style={{ color: `${typingcolor}` }}
              className="gametypetyping"
              onClick={clickTypingGame}
            >
              타자 게임
            </div>
            <div
              style={{ color: `${ssafycolor}` }}
              className="gametypessafy"
              onClick={clickSsafyGame}
            >
              싸피 게임
            </div>
          </Down>
          <MyPower>
            <div style={{ width: '100%' }}>
              {/* <h1>{userInfo.nickname}님의 최근 전적</h1> */}
              {gameType === 'algo' && (
                <div style={{ width: '100%' }}>
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
              {gameType === 'ssafy' && (
                <div>
                  <SsafyRecordTable ssafyList={ssafyList}></SsafyRecordTable>
                </div>
              )}
            </div>
          </MyPower>
        </>
      )}
    </MyPageContainer>
  );
};

export default MyPage;
