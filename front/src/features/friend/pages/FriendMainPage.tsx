import { useSelector, useDispatch } from 'react-redux';

import { friendActions } from '../friendSlice';

import FriendList from './FriendList';
import FriendModal from '../components/FriendModal';

function FriendMainPage() {
  const dispatch = useDispatch()
  const { friends } = useSelector((state:any) => state.friend)
  const { modal } = useSelector((state:any) => state.friend)

  const handleModal = (e:string) => {
    dispatch(friendActions.handleModal(e))
  }
  const handleCloseModal = () => {
    dispatch(friendActions.handleModal(null))
  }
  return <>
    <h2>친구목록</h2>
    <button onClick={() => handleModal('toYou')}>친구신청하기</button>
    <button onClick={() => handleModal('toMe')}>요청목록</button>
    {modal && <FriendModal handleCloseModal={handleCloseModal} />}
    {friends ? <FriendList /> :
    <div>친구창이 조용합니다...</div>}
  </>
}
export default FriendMainPage