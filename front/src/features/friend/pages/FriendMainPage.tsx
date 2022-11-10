import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../friendSlice';
import FriendList from './FriendList';
import FriendModal from '../components/FriendModal';
import styled from 'styled-components';

const FriendSide = styled.div`
  width: 18%;
  height: 100%;
  background-color: #232323;
  color: white;

  .sideTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10%;
    box-sizing: border-box;
    background: #ffffff;
    border: 3px solid #000000;
    border-radius: 10px;

    .sideTitleImg {
      height: 100%;
    }
    .sideTitleContent {
      font-family: 'NeoDunggeunmo';
      margin-left: 0.8rem;
      font-size: 48px;
      font-weight: 700;
      color: #000000;
    }
  }
  .sideMain {
    height: 90%;
    background-color: #6f43ff;
    box-sizing: border-box;
    border: 3px solid #000000;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .friendButtons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    .friendButton {
      background: #ffc02d;
      border-radius: 15px;
      font-size: 20px;
      margin-left: 0.5rem;
    }
  }
`;

function FriendMainPage() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: any) => state.friend);
  const { modal } = useSelector((state: any) => state.friend);

  const handleModal = () => {
    dispatch(friendActions.handleModal());
  };
  return (
    <FriendSide>
      <div className="sideTitle">
        <img
          className="sideTitleImg"
          src="/img/friendEarth.png"
          alt="friendmark"
        />
        <div className="sideTitleContent">Friends</div>
      </div>
      <div className="sideMain">
        {modal && <FriendModal handleModal={handleModal} />}
        {friends ? <FriendList /> : <div>친구창이 조용합니다...</div>}
        <div className="friendButtons">
          <button className="friendButton" onClick={handleModal}>
            친구신청
          </button>
          <button className="friendButton">대기목록</button>
        </div>
      </div>
    </FriendSide>
  );
}
export default FriendMainPage;
