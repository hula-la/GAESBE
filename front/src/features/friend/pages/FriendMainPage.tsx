import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../friendSlice';
import FriendList from './FriendList';
import FriendModal from '../components/FriendModal';
import FriendSecondModal from '../components/FriendSecondModal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/Common/retroBtn.css';

const FriendSide = styled.div`
  width: 18vw;
  min-width: 12rem;
  height: 100%;
  background-color: #232323;
  color: white;

  z-index:10;

  animation-name: showToLeft;
  animation-duration: 1s;

  @keyframes showToLeft {
    0% {
      transform: translateX(16vw); /* 애니메이션이 0%만큼 동작시 */
      // 몇 줄을 넣어도 상관없다!!
    }
    50% {
      transform: translateX(-1vw); /* 애니메이션이 50%만큼 동작시 */
    }
    100% {
      transform: translateX(0); /* 애니메이션이 100%만큼 동작시 */
    }
  }

  .sideTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10%;
    box-sizing: border-box;
    background: #ffffff;
    border: 3px solid #000000;
    border-radius: 10px;
    color: #000000;

    .sideTitleImg {
      height: 100%;
    }
    .sideTitleContent {
      font-family: 'NeoDunggeunmo';
      margin-left: 0.8rem;
      font-size: 48px;
      font-weight: 700;
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
    overflow-y: auto;
  }
  .friendButtons {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    .friendButton {

      margin: 0 1rem;
    }
  }
  .chatRoomWrapper {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    box-sizing: border-box;
    width: 25%;
    height: 40%;
    background: #ffc02d;
    border: 3px solid #000000;
    border-radius: 10px;
  }
  .chatRoom {
    width: 100%;
    height: 100%;
    position: relative;
    .close {
      position: absolute;
      right: 0.8rem;
      top: 0.5rem;
    }
    .chatContent {
      overflow-y: auto;
      display: flex;
      flex-direction: column-reverse;
      height: 92%;
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
    }

    .chatInputs {
      width: 100%;
      height: 9%;
      display: flex;
      flex-direction: row;
      .chatInput {
        width: 82%;
        height: 100%;
        box-sizing: border-box;
        border: 3px solid #000000;
        border-radius: 10px;
      }
      .chatButton {
        width: 22%;
        height: 100%;
        box-sizing: border-box;
        border: 3px solid #000000;
        border-radius: 10px;
        background: #f0568c;
      }
    }
  }
`;

function FriendMainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInvite, setIsInvite] = useState<boolean>(false);
  const [showChatList, setShowChatList] = useState<any>(null);
  const [content, setContent] = useState<string>('');
  const { userInfo } = useSelector((state: any) => state.auth);
  const { friends } = useSelector((state: any) => state.friend);
  const { modal } = useSelector((state: any) => state.friend);
  const { secondModal } = useSelector((state: any) => state.friend);
  const { invitedGameInfo } = useSelector((state: any) => state.friend);
  const { isChatOpen } = useSelector((state: any) => state.friend);
  const { chatFriendId } = useSelector((state: any) => state.friend);
  const { chatList } = useSelector((state: any) => state.friend);

  useEffect(() => {
    if (chatFriendId && chatList.hasOwnProperty(chatFriendId)) {
      setShowChatList(chatList[chatFriendId]);
    }
  }, [chatFriendId, chatList]);

  useEffect(() => {
    if (invitedGameInfo) {
      setIsInvite(true);
    }
  }, [invitedGameInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(friendActions.fetchChatStart());
    }
  }, [userInfo]);

  const handleModal = () => {
    dispatch(friendActions.handleModal('request'));
  };

  const handleSecondModal = () => {
    dispatch(friendActions.handleSecondModal());
  };

  const closeModal = () => {
    dispatch(friendActions.handleModal(null));
  };

  const acceptInvite = () => {
    setIsInvite(false);
    navigate(`/game/${invitedGameInfo.inviteGameType}/friend`, {
      state: { shareCode: invitedGameInfo.inviteRoomCode },
    });
  };

  const rejectInvite = () => {
    setIsInvite(false);
  };

  const onClickClose = () => {
    dispatch(friendActions.closeChatRoom());
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const onSubmitChat = () => {
    dispatch(friendActions.sendChat(content));
    setContent('');
  };

  const onSubmitChat2 = (e: any) => {
    if (e.key === 'Enter') {
      dispatch(friendActions.sendChat(content));
      setContent('');
    }
  };

  return (
    <FriendSide>
      {!isInvite && (
        <div className="sideTitle">
          <img
            className="sideTitleImg"
            src="/img/friendEarth.png"
            alt="friendmark"
          />
          <div className="sideTitleContent">Friends</div>
        </div>
      )}
      {isInvite && (
        <div className="sideTitle">
          <div onClick={acceptInvite}>수락</div>
          <div onClick={rejectInvite}>거절</div>
        </div>
      )}
      <div className="sideMain">
        {modal === 'request' && (
          <FriendModal handleModal={closeModal} type="request" />
        )}
        {secondModal && (
          <FriendSecondModal handleSecondModal={handleSecondModal} />
        )}
        {friends ? <FriendList /> : <div>친구창이 조용합니다...</div>}
        <div className="friendButtons">
          <a href="javascript:void(0)" className="friendButton eightbit-btn eightbit-btn--proceed" onClick={handleModal}>친구신청</a>
          <a href="javascript:void(0)" className="friendButton eightbit-btn eightbit-btn--proceed" onClick={handleSecondModal}>대기목록</a>

          {/* <button className="friendButton" onClick={handleModal}>
            친구신청
          </button>
          <button className="friendButton" onClick={handleSecondModal}>
            대기목록
          </button> */}
        </div>
      </div>
      {isChatOpen && (
        <div className="chatRoomWrapper">
          <div className="chatRoom">
            <img
              src="/img/close.png"
              onClick={onClickClose}
              className="close"
              alt="close"
            />
            <div className="chatContent">
              {showChatList &&
                showChatList.map((chat: any, idx: number) => {
                  return (
                    <div key={idx}>
                      <p>{chat.msg}</p>
                    </div>
                  );
                })}
            </div>
            <div className="chatInputs">
              <input
                onChange={onChangeContent}
                onKeyDown={onSubmitChat2}
                className="chatInput"
                value={content}
                type="text"
              />
              <button onClick={onSubmitChat} className="chatButton">
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </FriendSide>
  );
}
export default FriendMainPage;
