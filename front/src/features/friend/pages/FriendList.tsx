import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FriendInterface } from '../../../models/friend';
import FriendListItem from '../components/FriendListItem';

const FriendListBlock = styled.div`
  height: 100%;
`;

function FriendList() {
  const { friends } = useSelector((state: any) => state.friend);
  const { chatList } = useSelector((state: any) => state.friend);
  const [chatCntObj, setChatCntObj] = useState<any>(null);

  useEffect(() => {
    const tmp = Object.keys(chatList).map((id) => {
      return chatList[id].map((chat: any) => {
        return chat.checked === false;
      }).length;
    });

    const tmpObj: any = {};
    const chatIdList = Object.keys(chatList);
    for (let i = 0; i < chatIdList.length; i++) {
      tmpObj[chatIdList[i]] = tmp[i];
    }
    setChatCntObj(tmpObj);
  }, [chatList]);

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
                chatCnt={chatCntObj[onlineFriend.id]}
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
                  chatCnt={chatCntObj[offlineFriend.id]}
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
