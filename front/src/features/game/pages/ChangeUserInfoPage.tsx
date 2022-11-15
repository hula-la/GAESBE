import { format } from 'path';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ChangeUserInfo = styled.div`
  width: 100%;
  color: white;
  background-color: #232323;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
`;
const MyCharacter = styled.div`
  /* border: 2px solid blue; */
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 50%;
  }
  .h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SelectCharacter = styled.div`
  color: white;
  padding-bottom: 1%;
  /* border: 2px solid yellow; */
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 70px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: gray;
  }
`;
const CharacterList = styled.div`
  width: 30%;
  margin: 1%;
  /* display: flex; */
  justify-content: center;
  text-align: center;
`;
const UnLockedCharacter = styled.img`
  width: 50%;
`;
const LockedCharacter = styled.img`
  width: 50%;
  opacity: 0.7;
`;
const ChangeUserInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleUnLockSelectCharacter = () => {
    alert('아직 획득하지 못한 캐릭터 입니다.');
  };
  const handleChangeCharacter = () => {
    dispatch(
      authActions.createUserInfoStart({ nickname, profileChar: profilechar }),
    );
  };
  const handleMypage = () => {
    navigate('/game/mypage');
  };
  console.log('123', profilechar);
  return (
    <ChangeUserInfo>
      <MyCharacter>
        {!changeNickName && (
          <h1 className="h1">
            {userInfo.nickname}
            {/* <button onClick={handleInput}>변경</button> */}
            <img
              onClick={handleInput}
              src="/img/selectbutton/setnicknamebutton.png"
              alt=""
            />
          </h1>
        )}
        {changeNickName && (
          <h1 className="h1">
            <input onChange={onChangeNickname} />
            {isDuplicate && <p>중복된 닉네임입니다.</p>}
            {/* <button onClick={onClickHandler}>닉네임 변경</button> */}
            <img
              onClick={onClickHandler}
              src="/img/selectbutton/setnicknamebutton.png"
              alt=""
            />
          </h1>
        )}
        <img
          className="img"
          src={`${process.env.REACT_APP_S3_URL}/profile/${profilechar}_normal.gif`}
          alt="캐릭터 없음"
        />
        <button onClick={handleMypage}>나가기</button>
      </MyCharacter>
      <SelectCharacter>
        <h1>당신의 캐릭터를 변경하세요</h1>

        {characterList.map((character: any) => {
          return (
            <>
              {character.own ? (
                <CharacterList
                  key={character.characterId}
                  onClick={(e) => handleSelectCharacter(character.characterId)}
                >
                  <UnLockedCharacter
                    src={`${process.env.REACT_APP_S3_URL}/profile/${character.characterId}_normal.gif`}
                    alt="프로필 이미지"
                  />
                </CharacterList>
              ) : (
                <CharacterList
                  key={character.characterId}
                  onClick={(e) => handleUnLockSelectCharacter()}
                >
                  <LockedCharacter
                    src={`${process.env.REACT_APP_S3_URL}/profile/${character.characterId}_normal.gif`}
                    alt="프로필 이미지"
                  />
                  <p>{character.need}</p>
                </CharacterList>
              )}
            </>
          );
        })}
        <button onClick={handleChangeCharacter}>변경</button>
      </SelectCharacter>
    </ChangeUserInfo>
  );
};

export default ChangeUserInfoPage;
