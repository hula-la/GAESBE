import { useSelector } from 'react-redux';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from './FriendListItem';

function InviteFriend() {
  const { friends } = useSelector((state: any) => state.friend);

  return (
    <>
      {friends.online &&
        friends.online.length > 0 &&
        friends.online(
          <>
            {friends.online.map(
              (onlineFriend: FriendInterface, idx: Number) => {
                return (
                  <FriendListItem
                    key={onlineFriend.id}
                    type="online"
                    friend={onlineFriend}
                    category="invite"
                  />
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
