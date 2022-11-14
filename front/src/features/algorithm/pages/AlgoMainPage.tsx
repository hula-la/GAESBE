import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAlgoRoomList } from '../../../api/algoApi';
import { algoActions } from '../algorithmSlice';
import { AlgoRoomInterface } from '../../../models/algo';

import AlgoRoom from '../components/AlgoRoom';
import styled from 'styled-components';
import '../../../components/Common/retroBtn.css';
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 80%;
  margin: 0 auto;
  .title {
    text-align: center;
    height: 15%;
    img {
      width: 60%;
      height: 100%;
    }
  }
  .btn-top {
    height: 7%;
    margin-bottom: 3%;
    text-align: right;
    a {
      margin-right: 2%;
    }
  }
  .btn-bottom {
    height: 12%;
    margin-top: 2%;
    text-align: center;
    display: grid;
    a {
      margin: auto;
      justify-content: center;
    }
  }
  .room-wrapper {
    display: flex;
    flex-direction: row;
    text-align: center;
    height: 66%;
  }
  .room {
    width: 50%;
    outline-style: solid;
    outline-width: 5px;
    outline-color: black;
    margin-right: 2%;
  }
  .left {
    h2 {
      color: #6f43ff;
    }
  }
  .right {
    h2 {
      color: #f0568c;
    }
  }

  .room-list {
    height: 83%;
    overflow-y: auto;
    border-top: 5px solid black;
  }
`;

function AlgoMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { needReload } = useSelector((state: any) => state.algo);
  const [roomList, setRoomList] = useState<{
    start: AlgoRoomInterface[];
    wait: AlgoRoomInterface[];
  }>({ start: [], wait: [] });

  const handleMakeRoom = () => {
    navigate('make');
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (needReload) {
      fetchRooms();
      dispatch(algoActions.setNeedReload(false));
    }
  }, [needReload]);

  const fetchRooms = async () => {
    try {
      const res = await fetchAlgoRoomList();
      setRoomList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReload = () => {
    fetchRooms();
  };

  return (
    <Wrapper>
      <Content>
        <h1 className="title">
          <img src={`/img/gametitle/gametitle4.png`}></img>
        </h1>
        <div className="btn-top">
          <a onClick={handleReload} className="eightbit-btn">
            새로고침
          </a>
          <a
            onClick={handleReload}
            className="eightbit-btn eightbit-btn--proceed"
          >
            백준연동
          </a>
        </div>
        <div className="room-wrapper">
          <div className="room left">
            <h2>대기중인 방</h2>
            <div className="room-list">
              {roomList.wait.length > 0 &&
                roomList.wait.map((room) => {
                  return <AlgoRoom key={room.roomCode} roomInfo={room} />;
                })}
            </div>
          </div>
          <div className="room right">
            <h2>진행중인 방</h2>
            <div className="room-list">
              {roomList.start.length > 0 &&
                roomList.start.map((room) => {
                  return <AlgoRoom key={room.roomCode} roomInfo={room} />;
                })}
            </div>
          </div>
        </div>
        <div className="btn-bottom">
          <a
            className="eightbit-btn eightbit-btn--proceed"
            onClick={handleMakeRoom}
          >
            방만들기
          </a>
        </div>
      </Content>
    </Wrapper>
  );
}
export default AlgoMainPage;
