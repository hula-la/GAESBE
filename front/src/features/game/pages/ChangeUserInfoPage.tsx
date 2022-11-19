import { format } from 'path';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { authActions } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ChangeUserInfo = styled.div`
  width: 100%;
  height: 98%;
  color: white;
  background-color: #232323;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
`;
const BackArrow = styled.img`
  position: absolute;
  width: 3%;
  top: 5%;
  left: 20%;
  transform: scaleX(-1);
`;
const Back = styled.img`
  position: absolute;
  width: 10%;
  top: 5%;
  left: 23%;
  /* transform: scaleX(-1); */
`;
const MyCharacter = styled.div`
  /* border: 2px solid blue; */
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyCharacterInfo = styled.div`
  /* border: 2px solid blue; */
  width: 45%;
  height: 100%;
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
    .nicknameblock {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
    .check {
      font-size: 50%;
    }
  }
`;
const SelectCharacter = styled.div`
  width: 55%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 70px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: gray;
  } */
`;
const AllCharacterList = styled.div`
  width: 100%;
  height: 70%;
  color: white;
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
  width: 100%;
  /* width: 50%; */
  opacity: 0.7;
`;
const ChangeUserInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDuplicate, userInfo } = useSelector((state: any) => state.auth);
  const [nickname, setNickname] = useState<string>('');
  const [profilechar, setProfilechar] = useState<string>('');
  const { characters } = useSelector((state: any) => state.item);
  const [lengthOutOfRange, setLengthOutOfRange] = useState<boolean>(false);

  let characterList = characters;
  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setProfilechar(userInfo.profileChar);
    }
  }, [userInfo]);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setLengthOutOfRange(true);
    } else {
      setLengthOutOfRange(false);
    }
    setNickname(e.target.value);
    dispatch(authActions.checkNicknameStart(e.target.value));
  };
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (isDuplicate || lengthOutOfRange) {
      Swal.fire({
        icon: 'error',
        text: '닉네임이 중복되거나 글자수 제한에 맞지 않습니다',
      });
      return;
    }
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
    Swal.fire({ icon: 'info', text: '아직 획득하지 못한 캐릭터 입니다.' });
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
        <BackArrow
          onClick={handleMypage}
          src="/img/arrow/back-arrow.png"
          alt=""
        />
        <Back onClick={handleMypage} src="/img/arrow/back.png" alt="" />
        <MyCharacterInfo>
          {!changeNickName && userInfo && (
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
              <div className="nicknameblock">
                <div>
                  <input onChange={onChangeNickname} value={nickname} />
                  {/* <button onClick={onClickHandler}>닉네임 변경</button> */}
                  <img
                    onClick={onClickHandler}
                    src="/img/selectbutton/setnicknamebutton.png"
                    alt=""
                  />
                </div>
                <div className="check">
                  {isDuplicate && <p>중복된 닉네임입니다.</p>}
                  {lengthOutOfRange && <p>닉네임은 2~6글자만 가능합니다</p>}
                </div>
              </div>
            </h1>
          )}
          <img
            className="img"
            src={`${process.env.REACT_APP_S3_URL}/profile/${profilechar}_normal.gif`}
            alt="캐릭터 없음"
          />
          {/* <a
            href="javascript:void(0)"
            className="eightbit-btn eightbit-btn--reset"
            onClick={handleMypage}
          >
            나가기
          </a> */}
        </MyCharacterInfo>
      </MyCharacter>
      <SelectCharacter>
        <h1>당신의 캐릭터를 변경하세요</h1>
        <AllCharacterList>
          {characterList &&
            characterList.map((character: any) => {
              return (
                <>
                  {character.own ? (
                    <CharacterList
                      key={character.characterId}
                      onClick={(e) =>
                        handleSelectCharacter(character.characterId)
                      }
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
                      {/* <LockedCharacter
                        
                        src={`${process.env.REACT_APP_S3_URL}/profile/${character.characterId}_normal.gif`}
                        alt="프로필 이미지"
                      />
                      <p>{character.need}</p>
                    </CharacterList> */}
                      <LockedCharacter
                        src="/img/rank/lockedcharacter.png"
                        alt="프로필 이미지"
                      />
                      <p>{character.need}</p>
                    </CharacterList>
                  )}
                </>
              );
            })}
        </AllCharacterList>
        <a
          href="javascript:void(0)"
          className="eightbit-btn"
          onClick={handleChangeCharacter}
        >
          캐릭터 변경
        </a>
        {/* <button onClick={handleChangeCharacter}>변경</button> */}
      </SelectCharacter>
    </ChangeUserInfo>
  );
};

export default ChangeUserInfoPage;
