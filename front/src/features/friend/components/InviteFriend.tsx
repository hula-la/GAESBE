import { useSelector } from 'react-redux';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from './FriendListItem';
import styled from 'styled-components';
import { friendActions } from '../friendSlice';
import { useDispatch } from 'react-redux';
const Close = styled.img`
  position: absolute;
  right: 10%;
  :hover {
    cursor: url('/img/cursor/hover_cursor.png'), auto;
    transform: scale(1.05);
  }
`;

const InviteBlock = styled.div`
  margin-top: 2rem;
`;

function InviteFriend() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: any) => state.friend);
  const closeModal = () => {
    dispatch(friendActions.handleModal(null));
  };
  return (
    <>
      <Close onClick={closeModal} src="/img/close.png" alt="close" />
      {friends.online && friends.online.length > 0 && (
        <InviteBlock>
          {friends.online.map((onlineFriend: FriendInterface, idx: Number) => {
            return (
              <>
                {/* <Close onClick={closeModal} src="/img/close.png" alt="" /> */}
                <FriendListItem
                  key={onlineFriend.id}
                  type="online"
                  friend={onlineFriend}
                  category="invite"
                />
              </>
            );
          })}
        </InviteBlock>
      )}
      {friends.online && friends.online.length === 0 && (
        <>
          <div>초대할 친구가 없습니다.</div>
        </>
      )}
    </>
  );
}
export default InviteFriend;
