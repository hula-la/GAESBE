import { format } from 'path';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { Navigate } from 'react-router-dom';

const ChangeUserInfo = styled.div`
  width: 100%;
  color: white;
  background-color: #232323;
  border: 2px solid red;
  display: flex;
  flex-direction: row;
`;
const MyCharacter = styled.div`
  border: 2px solid blue;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 50%;
  }
`;
const SelectCharacter = styled.div`
  border: 2px solid yellow;
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
`;
const CharacterList = styled.div`
  width: 30%;
  margin: 1%;
  text-align: center;
`;
const ChangeUserInfoPage = () => {
  const dispatch = useDispatch();
  const { isDuplicate } = useSelector((state: any) => state.auth);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [profilechar, setProfilechar] = useState<string>(userInfo.profileChar);
  console.log(nickname, '이게?');
  console.log(userInfo.nickname, '이거는?');
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    dispatch(authActions.checkNicknameStart(e.target.value));
  };
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(
      authActions.createUserInfoStart({
        nickname,
        profileChar: userInfo.profileChar,
      }),
    );
    setChangeNickName(false);
  };
  const [changeNickName, setChangeNickName] = useState<boolean>(false);
  const imageNo = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
    { value: '13' },
    { value: '14' },
    { value: '15' },
    { value: '16' },
    { value: '17' },
    { value: '18' },
    { value: '19' },
    // { value: '20' },
    { value: '21' },
    { value: '22' },
    // { value: '23' },
    { value: '24' },
  ];
  const handleInput = () => {
    setChangeNickName(true);
  };
  const handleSelectCharacter = (item: any) => {
    return setProfilechar(item);
  };
  const handleChangeCharacter = () => {
    dispatch(
      authActions.createUserInfoStart({ nickname, profileChar: profilechar }),
    );
  };
  console.log('123', profilechar);
  return (
    <ChangeUserInfo>
      <MyCharacter>
        {!changeNickName && (
          <h1>
            {userInfo.nickname}
            <button onClick={handleInput}>변경</button>
          </h1>
        )}
        {changeNickName && (
          <h1>
            <input onChange={onChangeNickname} />
            {isDuplicate && <p>중복된 닉네임입니다.</p>}
            <button onClick={onClickHandler}>닉네임 변경</button>
          </h1>
        )}
        <img
          className="img"
          src={`${process.env.REACT_APP_S3_URL}/profile/${profilechar}_normal.gif`}
          alt="캐릭터 없음"
        />
      </MyCharacter>
      <SelectCharacter>
        <h1>당신의 캐릭터를 변경하세요!!!!!!!!!!!!</h1>
        {imageNo.map((item) => (
          <CharacterList
            key={item.value}
            onClick={(e) => handleSelectCharacter(item.value)}
          >
            <img
              src={`${process.env.REACT_APP_S3_URL}/profile/${item.value}_normal.gif`}
              alt="프로필 이미지"
            />
          </CharacterList>
        ))}
        <button onClick={handleChangeCharacter}>변경</button>
      </SelectCharacter>
    </ChangeUserInfo>
  );
};

export default ChangeUserInfoPage;
