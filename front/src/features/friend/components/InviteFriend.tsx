import { useSelector } from 'react-redux';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from './FriendListItem';
import styled from 'styled-components';
import { friendActions } from '../friendSlice';
import { useDispatch } from 'react-redux';
const Close = styled.img`
  position: absolute;
  right: 10%;
`;

function InviteFriend() {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: any) => state.friend);
  const closeModal = () => {
    dispatch(friendActions.handleModal(null));
  };
  return (
    <>
      {friends.online &&
        friends.online.length > 0 &&
        friends.online(
          <>
            {friends.online.map(
              (onlineFriend: FriendInterface, idx: Number) => {
                return (
                  <>
                   <Close onClick={closeModal} src="/img/close.png" alt="" />
                    <FriendListItem
                      key={onlineFriend.id}
                      type="online"
                      friend={onlineFriend}
                      category="invite"
                    />
                  </>
                );
              },
            )}
          </>,
        )}
      {friends.online.length === 0 && <div>초대할 친구가 없습니다.</div>}
    </>
  );
}
export default InviteFriend;
