import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { algoActions } from '../algorithmSlice';
import { AlgoRoomInterface } from '../../../models/algo';
import styled from 'styled-components';
import '../../typing/pages/retroBtn.css';

interface Props {
  roomInfo: AlgoRoomInterface;
}

const Wrapper = styled.div`
  background-image: url(/img/explorerWindow.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90% 135%;
  margin-top: 5%;
  height: 15%;
  min-height: 82px;
  display: flex;
  /* align-items: center; */
  .content {
    margin: auto;
    height: 95%;
    width: 79%;
    display: grid;
    grid-template-rows: 1fr 2fr;
    text-align: left;

    .header {
      font-size: 1.4rem;
      margin-left: 3%;
    }
    .body {
      height: 100%;
      text-align: center;
      font-size: 1.5rem;
      color: #232323;
      display: grid;
      grid-template-columns: 1fr 2fr 2fr 2fr;
      span {
        margin: auto 0;
        img {
          padding-top: 15%;
        }
        a {
          font-size: 1.2rem;
          padding: 4%;
          border: 3px solid #232323;
          background-color: #e9e9e9;
        }
      }
    }
  }
`;

function AlgoRoom({ roomInfo }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { InGameInfo } = useSelector((state: any) => state.algo);
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleEnterRoom = () => {
    if (userInfo.bjId) {
      dispatch(algoActions.enterAlgoRoom(roomInfo));
    } else {
      alert('백준아이디를 연동해야지만 게임을 할 수 있습니다');
      navigate('/game/algo');
    }
  };

  useEffect(() => {
    if (InGameInfo) {
      navigate('/game/algo/battle');
    }
  }, [InGameInfo]);

  const tierName = ['브론즈', '실버', '골드', '플래티넘'];
  return (
    <>
      <Wrapper>
        {/* <img src={`/img/explorerWindow.png`} /> */}
        <div className="content">
          <div className="header">
            {tierName[Math.floor(parseInt(roomInfo.tier) / 5)]}{' '}
            {6 -
              (Math.floor(parseInt(roomInfo.tier) % 5) === 0
                ? 5
                : Math.floor(parseInt(roomInfo.tier) % 5))}
          </div>
          <div className="body">
            <span>
              <img
                src={`/img/tier/${roomInfo.tier}.svg`}
                alt={`난이도${roomInfo.tier}`}
                style={{ width: '1.6rem', height: '1.6rem' }}
              />
            </span>
            <span>{roomInfo.time}분</span>
            <span>{roomInfo.num}명</span>
            <span>
              {!roomInfo.start && <a onClick={handleEnterRoom}>입장</a>}
              {roomInfo.start && <a onClick={handleEnterRoom}>게임중</a>}
            </span>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
export default AlgoRoom;
