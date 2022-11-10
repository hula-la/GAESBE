import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from '../components/FriendListItem';

const FriendListBlock = styled.div`
  height: 100%;

  .friendBoxWrapper {
    height: 100%;
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .friendBox {
    box-sizing: border-box;
    border: 3px solid #8d84f3;
    border-radius: 10px;
    height: 10%;
    width: 85%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .profileNickname {
      width: 65%;
      height: 100%;
      display: flex;
      align-items: center;
      .profileCircle {
        border-radius: 50%;
        height: 70%;
        width: 100%;
        background-color: #ffffff;
        .profile {
          height: 90%;
          width: 90%;
          margin-left: 0.1rem;
          margin-top: 0.1rem;
        }
      }
    }
    .nicknameBox {
      margin-left: 0.5rem;
      .level {
        font-size: 10px;
      }
      .nickname {
        @import url('https://fonts.googleapis.com/css2?family=Iceberg&display=swap');
        font-family: 'Iceberg', cursive;
        font-size: 20px;
        font-weight: 600;
      }
    }
    .messageImg {
      height: 60%;
    }
  }
`;

function FriendList() {
  const { friends } = useSelector((state: any) => state.friend);

  return (
    <FriendListBlock>
      <div className="friendBoxWrapper">
        <div className="friendBox">
          <div className="profileNickname">
            <div className="profileCircle">
              <img className="profile" src="/img/rank/character1.png" />
            </div>
            <div className="nicknameBox">
              <div className="level">LV1. 대기업</div>
              <div className="nickname">NICKNAME</div>
            </div>
          </div>
          <img className="messageImg" src="/img/messageImg.png" />
        </div>
      </div>
      {/* {friends.online && (
        <>
          <h3>온라인 친구입니다</h3>
          {friends.online.map((onlineFriend: FriendInterface) => {
            return (
              <FriendListItem
                key={onlineFriend.id}
                type="online"
                friend={onlineFriend}
              />
            );
          })}
        </>
      )}
      {friends.offline && (
        <>
          <h3>오프라인 친구입니다</h3>
          {friends.offline.map((offlineFriend: FriendInterface) => {
            return (
              <FriendListItem
                key={offlineFriend.id}
                type="offline"
                friend={offlineFriend}
              />
            );
          })}
        </>
      )} */}
    </FriendListBlock>
  );
}
export default FriendList;
