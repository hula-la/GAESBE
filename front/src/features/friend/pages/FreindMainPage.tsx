

import { useSelector } from 'react-redux';

import FriendList from './FriendList';

function FreindMainPage() {
  const {friends} = useSelector((state:any) => state.friend)
  
  
  return <>
    <h1>친구목록입니다.</h1>
    <button>친구신청하기</button>
    {friends ? <FriendList /> :
    <div>친구창이 조용합니다...</div>}
  </>
}
export default FreindMainPage