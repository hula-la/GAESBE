import { useSelector, useDispatch } from 'react-redux';

import { friendActions } from '../friendSlice';

import FriendList from './FriendList';
import FriendModal from '../components/FriendModal';

function FriendMainPage() {
  const dispatch = useDispatch()
  const { friends } = useSelector((state:any) => state.friend)
  const { modal } = useSelector((state:any) => state.friend)

  const handleModal = () => {
    dispatch(friendActions.handleModal())
  }
  return <>
    <h2>친구목록</h2>
    <button onClick={handleModal}>친구 관리하기</button>
    {modal && <FriendModal handleModal={handleModal} />}
    {friends ? <FriendList /> :
    <div>친구창이 조용합니다...</div>}
  </>
}
export default FriendMainPage