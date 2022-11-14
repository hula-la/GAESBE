import { useSelector } from 'react-redux';

import BeforeSolveUsers from './BeforeSolveUsers';
import LoadingSpinner from './LoadingSpinner';
import '../../../components/Common/retroBtn.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;

  .btn-top {
    text-align: left;
    height: 10%;
  }
  .user {
    height: 70%;
    background-image: url(/img/background/park.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 121%;
    display: flex;
    flex-direction: column;
  }
  .btn-bottom {
    height: 20%;
    display: flex;
    justify-items: center;
    a {
      margin: auto;
    }
  }
`;

function AlgoBeforeStart({ handleLeaveRoom, startGame, inGameUsers }: any) {
  const { InGameInfo, loadingMsg } = useSelector((state: any) => state.algo);
  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <Wrapper>
      <div className="btn-top">
        <a onClick={handleLeaveRoom} className="eightbit-btn ">
          나가기
        </a>
      </div>
      {loadingMsg === 'START' && (
        <LoadingSpinner loadingMsg="곧 배틀이 시작됩니다" />
      )}
      <div className="user">
        <BeforeSolveUsers inGameUsers={inGameUsers} />
        
      </div>
      <div className="btn-bottom">
        {InGameInfo.master == userInfo.id && (
          <a onClick={startGame} className="eightbit-btn eightbit-btn--proceed">
            배틀 시작
          </a>
        )}
        {InGameInfo.master != userInfo.id && (
          <a className="eightbit-btn eightbit-btn--enable">대기중</a>
        )}
      </div>
    </Wrapper>
  );
}
export default AlgoBeforeStart;
