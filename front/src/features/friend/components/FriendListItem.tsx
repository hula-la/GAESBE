import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { deleteFriend } from '../../../api/friendApi';
import { friendActions } from '../friendSlice';

const FriendListItemBlock = styled.div`
  width: 100%;
  .friendBoxWrapper {
    height: 4rem;
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover .speechBubbleWrapper {
      display: block;
    }
  }
  .friendBox {
    position: relative;
    box-sizing: border-box;
    border: 3px solid #8d84f3;
    border-radius: 10px;
    height: 100%;
    width: 85%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .linetb {
      border-bottom: 1px solid black;
      border-top: 1px solid black;
    }
    .speechBubbleWrapper {
      position: absolute;
      right: calc(100% + 17px);
      display: none;
    }
    .speechBubble {
      position: relative;
      background: #ffc02d;
      border-radius: 0.4em;
      width: 9rem;
      /* height: 6rem; */
      display: flex;
      flex-direction: column;
      /* justify-content: space-evenly; */
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
        padding: 0.4rem 0;
      }
      .bubbleText:hover {
        background-color: #e6a713;
      }
      .bubbleText.top:hover {
        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
      }
      .bubbleText.mid:hover::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 17px solid transparent;
        border-left-color: #e6a713;
        border-right: 0;
        margin-top: -17px;
        margin-right: -17px;
        z-index: 5;
      }
      .bubbleText.bottom:hover {
        border-bottom-right-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
      }

      .textRed {
        color: #ff0000;
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
        height: 2rem;
        width: 2rem;
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

function FriendListItem({ friend, type, category }: any) {
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

  const invite = () => {
    dispatch(friendActions.inviteFriend(friend.id));
  };

  return (
    <FriendListItemBlock>
      <div className="friendBoxWrapper">
        <div className="friendBox">
          {category === 'noInvite' && (
            <div className="speechBubbleWrapper">
              <div className="speechBubble">
                <div className="bubbleText top">방 놀러가기</div>
                {/* <hr className="styledHr" /> */}
                <div className="bubbleText linetb mid">채팅방</div>
                {/* <hr className="styledHr" /> */}
                <div
                  className="bubbleText textRed bottom"
                  onClick={handleDeleteFriend}
                >
                  친구 삭제
                </div>
              </div>
            </div>
          )}
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
          {category === 'noInvite' && (
            <img className="messageImg" src="/img/messageImg.png" />
          )}
          {category === 'invite' && <button onClick={invite}>초대하기</button>}
        </div>
      </div>
    </FriendListItemBlock>
  );
}
export default FriendListItem;
