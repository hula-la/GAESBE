import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { deleteFriend } from '../../../api/friendApi';
import { friendActions } from '../friendSlice';

const FriendListItemBlock = styled.div`
  height: 100%;
  width: 100%;
  .friendBoxWrapper {
    height: 100%;
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .friendBox {
    position: relative;
    box-sizing: border-box;
    border: 3px solid #8d84f3;
    border-radius: 10px;
    height: 10%;
    width: 85%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .speechBubbleWrapper {
      position: absolute;
      left: -70%;
      display: none;
    }
    .speechBubble {
      position: relative;
      background: #ffc02d;
      border-radius: 0.4em;
      width: 9rem;
      height: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .styledHr {
        margin: 0 auto;
        width: 98%;
        height: 1px;
        background-color: #000000;
        border: 0px;
      }
      .bubbleText {
        text-align: center;
        color: #000000;
        font-weight: 550;
      }
      .bubbleText2 {
        text-align: center;
        color: #ff0000;
        font-weight: 550;
      }
    }

    .speechBubble:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 0;
      height: 0;
      border: 17px solid transparent;
      border-left-color: #ffc02d;
      border-right: 0;
      margin-top: -17px;
      margin-right: -17px;
    }
    .profileNickname {
      width: 65%;
      height: 100%;
      display: flex;
      align-items: center;
      .profileCircle {
        position: relative;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        height: 82%;
        width: 34%;
        background-color: #ffffff;
        .profile {
          height: 90%;
          width: 55%;
        }
        .online {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: aquamarine;
        }
        .offline {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #8d84f3;
        }
      }
    }
    .friendBox:hover .speechBubbleWrapper {
      display: block;
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

function FriendListItem({ friend, type }: any) {
  const dispatch = useDispatch();

  const handleDeleteFriend = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const res = await deleteFriend(friend.id);
        if (res.status === 200) {
          dispatch(friendActions.setNeedReload(true));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FriendListItemBlock>
      <div className="friendBoxWrapper">
        <div className="friendBox">
          <div className="speechBubbleWrapper">
            <div className="speechBubble">
              <div className="bubbleText">방 놀러가기</div>
              <hr className="styledHr" />
              <div className="bubbleText">채팅방</div>
              <hr className="styledHr" />
              <div className="bubbleText2">친구 삭제</div>
            </div>
          </div>
          <div className="profileNickname">
            <div className="profileCircle">
              <img
                className="profile"
                src={`${process.env.REACT_APP_S3_URL}/profile/${friend.profileChar}_normal.gif`}
              />
              {type === 'online' && <div className="online" />}
              {type === 'offline' && <div className="offline" />}
            </div>
            <div className="nicknameBox">
              <div className="level">LV1. 대기업</div>
              <div className="nickname">{friend.nickname}</div>
            </div>
          </div>

          <img className="messageImg" src="/img/messageImg.png" />
        </div>
      </div>
    </FriendListItemBlock>
  );
}
export default FriendListItem;
