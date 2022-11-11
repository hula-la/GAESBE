import { useSelector } from 'react-redux';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from './FriendListItem';

function InviteFriend() {
  const { friends } = useSelector((state: any) => state.friend);

  return (
    <>
      {friends.online && (
        <>
          {friends.online.map((onlineFriend: FriendInterface, idx: Number) => {
            return (
              <FriendListItem
                key={onlineFriend.id}
                type="online"
                friend={onlineFriend}
                category="invite"
              />
            );
          })}
        </>
      )}
    </>
  );
}
export default InviteFriend;
