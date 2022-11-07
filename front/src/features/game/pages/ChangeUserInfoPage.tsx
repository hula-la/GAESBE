import { format } from 'path';
import { useEffect, useState } from "react";
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
`
const MyCharacter = styled.div`
border: 2px solid blue;
width: 40rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const SelectCharacter = styled.div`
border: 2px solid yellow;
width: 41rem;
`
const ChangeUserInfoPage = () => {
    const { isDuplicate } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [nickname, setNickname] = useState<string>(userInfo.nickname);
    console.log(nickname,'이게?')
    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      dispatch(authActions.checkNicknameStart(e.target.value));
    };
    const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
      dispatch(authActions.createUserInfoStart({ nickname, profileChar: 0 }));
      
    };
    const [form, setForm] = useState({});
    const [changeNickName, setChangeNickName] = useState<boolean>(false);
    const imageNo = [
        { name: "첫번째", value: "1" },
        { name: "두번째", value: "2" },
        { name: "세번째", value: "3" },
        { name: "네번째", value: "4" },
    ]
    // const handleChangeInfo = (e) => {
    //     e.preventDefault();
    const handleInput = () => {
        setChangeNickName(true)
    }
    const handleSelectCharacter = () => {
        console.log()
    }
    return (

        <ChangeUserInfo>
            회원정보 수정 페이지
            <MyCharacter>
                {!changeNickName && 
                <h1>
                    {userInfo.nickname} 
                    <button onClick={handleInput}>변경</button>
                </h1>
                }
                {changeNickName &&
                <h1>
                    <input onChange={onChangeNickname} />
                    {isDuplicate && <p>중복된 닉네임입니다.</p>}
                    <button onClick={onClickHandler}>닉네임 변경</button>
                </h1>
                }
                <img
                    src={`/img/rank/character${userInfo.profileChar + 1}.png`}
                    alt="asdf"
                />
            </MyCharacter>
            <SelectCharacter>
                {/* {imageNo.map((item) => (
                    <p key={item.value}>
                        <label htmlFor={item.name}>
                            <input type="radio" 
                            id={item.name}
                            value={item.value}
                            name="imageNo"
                            // checked={item.value}
                            // onChange={handleForm}
                            />
                            <img src={`/img/rank/character${item.value}.png`} alt="프로필 이미지" />
                        </label>
                    </p>
                ))} */}
                {imageNo.map((item) => (
                    <p key={item.value} onClick={handleSelectCharacter}>
                        <p>{item.value}</p>
                        <img src={`/img/rank/character${item.value}.png`} alt="프로필 이미지" />
                    </p>
                        
                ))}
            </SelectCharacter>
        </ChangeUserInfo>
);
}

export default ChangeUserInfoPage;