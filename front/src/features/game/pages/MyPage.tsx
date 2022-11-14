import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const MyPageContainer = styled.div`
  width: 66%;
  color: white;
  background-color: #232323;
  border: 2px solid red;
  display: flex;
  flex-direction: row;
`;

const MyCharacter = styled.div`
  border: 2px solid blue;
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyPower = styled.div`
  border: 2px solid yellow;
  width: 41rem;
`;
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { record } = useSelector((state: any) => state.game);
  const [csrecord, setCsRecord] = useState<any>(record.cs.content);
  const [typingrecord, setTypingRecord] = useState<any>(record.typing.content);
  let csList: Array<any> = csrecord;
  let typingList: Array<any> = typingrecord;

  const handleDelete = () => {
    var deleteConfirm = window.confirm('정말 삭제할거?');
    if (deleteConfirm) {
      dispatch(authActions.deleteUserInfoStart());
      navigate('/login');
      console.log('지금 유저 인포', userInfo);
      // 유저 인포 널로 바꾸고
      // 엑세스 토큰 지우고
    } else {
      alert('삭제 안함');
    }
  };
  const handleChange = () => {
    navigate('change');
  };

  // useEffect(() => {
  //   dispatch(gameActions.fetchRecordStart());
  // }, []);
  return (
    <MyPageContainer>
      {userInfo && (
        <MyCharacter>
          <h1>{userInfo.nickname}</h1>
          <img
            // src={`/img/rank/character${userInfo.profileChar}.png`}
            src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
            alt="asdf"
          />
          <button onClick={handleChange}>정보 수정</button>
          <button onClick={handleDelete}>회원 탈퇴</button>
          {/* <button>기록 보기</button> */}
        </MyCharacter>
      )}
      <MyPower>
        <div>
          <h1>{userInfo.nickname}님의 최근 전적</h1>
          <div>
            <h1>CS</h1>
            {csList.map((e: any) => (
              <div>
                <div>{e.date}</div>
                <div>{e.ranks}등</div>
              </div>
            ))}
          </div>
          <div>
            <h1>TYPING</h1>
            {typingList.map((e: any) => (
              <div>
                <div>{e.ranks}</div>
              </div>
            ))}
          </div>
        </div>
      </MyPower>
    </MyPageContainer>
  );
};

export default MyPage;
