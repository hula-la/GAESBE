import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserInfoApi } from '../../../api/authApi';
import { authActions } from '../../auth/authSlice';
import { authSagas } from '../../auth/authSaga';
import { useNavigate } from 'react-router-dom';
import { gameActions } from '../gameSlice';

import AttendanceComponent from '../components/AttendanceComponent'
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

  useEffect(() => {
    dispatch(gameActions.fetchRecordStart());
  }, []);
  return (
    <MyPageContainer>
      <AttendanceComponent />
      {userInfo && (
        <MyCharacter>
          <h1>{userInfo.nickname}</h1>
          <img
            src={`/img/rank/character${userInfo.profileChar}.png`}
            alt="asdf"
          />
          <button onClick={handleChange}>정보 수정</button>
          <button onClick={handleDelete}>회원 탈퇴</button>
          <button>기록 보기</button>
        </MyCharacter>
      )}
      <MyPower>
        <h1>역량 부분</h1>
      </MyPower>
    </MyPageContainer>
  );
};

export default MyPage;
