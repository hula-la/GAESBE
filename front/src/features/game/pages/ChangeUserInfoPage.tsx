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
  color: white;
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
const UnLockedCharacter = styled.img``;
const LockedCharacter = styled.img`
  opacity: 0.7;
`;
const ChangeUserInfoPage = () => {
  const dispatch = useDispatch();
  const { isDuplicate } = useSelector((state: any) => state.auth);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [profilechar, setProfilechar] = useState<string>(userInfo.profileChar);
  const { characters } = useSelector((state: any) => state.item);

  let characterList = characters;
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
        <h1>당신의 캐릭터를 변경하세요</h1>

        {characterList.map((character: any) => {
          return (
            <CharacterList
              key={character.characterId}
              onClick={(e) => handleSelectCharacter(character.characterId)}
            >
              {character.own ? (
                <div>
                  <UnLockedCharacter
                    src={`${process.env.REACT_APP_S3_URL}/profile/${character.characterId}_normal.gif`}
                    alt="프로필 이미지"
                  />
                </div>
              ) : (
                <div>
                  <LockedCharacter
                    src={`${process.env.REACT_APP_S3_URL}/profile/${character.characterId}_normal.gif`}
                    alt="프로필 이미지"
                  />
                  <p>{character.need}</p>
                </div>
              )}
            </CharacterList>
          );
        })}
        <button onClick={handleChangeCharacter}>변경</button>
      </SelectCharacter>
    </ChangeUserInfo>
  );
};

export default ChangeUserInfoPage;
