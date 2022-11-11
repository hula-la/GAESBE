import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from '../components/FriendListItem';

const FriendListBlock = styled.div`
  height: 100%;
`;

function FriendList() {
  const { friends } = useSelector((state: any) => state.friend);

  return (
    <FriendListBlock>
      {friends.online && (
        <>
          {friends.online.map((onlineFriend: FriendInterface, idx: Number) => {
            return (
              <FriendListItem
                key={onlineFriend.id}
                type="online"
                friend={onlineFriend}
                category="noInvite"
              />
            );
          })}
        </>
      )}
      {friends.offline && (
        <>
          {friends.offline.map(
            (offlineFriend: FriendInterface, idx: Number) => {
              return (
                <FriendListItem
                  key={offlineFriend.id}
                  type="offline"
                  friend={offlineFriend}
                  category="noInvite"
                />
              );
            },
          )}
        </>
      )}
    </FriendListBlock>
  );
}
export default FriendList;
