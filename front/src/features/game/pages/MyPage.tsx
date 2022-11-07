import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MyPageContainer = styled.div`
  width: 100%;
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
  const { userInfo } = useSelector((state: any) => state.auth);
  console.log(userInfo);
  return (
    <MyPageContainer>
      <MyCharacter>
        <h1>{userInfo.nickname}</h1>
        <img
          src={`/img/rank/character${userInfo.profileChar + 1}.png`}
          alt="asdf"
        />
        <button>정보 수정</button>
        <button>회원 탈퇴</button>
        <button>기록 보기</button>
      </MyCharacter>
      <MyPower>
        <h1>역량 부분</h1>
      </MyPower>
    </MyPageContainer>
  );
};

export default MyPage;
