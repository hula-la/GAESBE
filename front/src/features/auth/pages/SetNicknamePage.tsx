import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../authSlice';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { setTimeout } from 'timers/promises';

const NickNameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: none;
  color: white;
  div {
    display: flex;
    flex-direction: column;
  }
  .maintitle {
    line-height: 3rem;
    max-width: 15em;
    flex-wrap: wrap;
  }

  .nickNameInput {
    padding: 0.4rem;
    border-radius: 0.4rem;
  }

  /* .showLater {
    display: flex;
    flex-direction: column;
    animation-name: showToRight;
    animation-duration: 3.2s;
    animation-iteration-count: infinite;

    @keyframes showToRight {
      0% {
        transform: scaleY(0);
      }
      50% {
        transform: scaleY(0);
      }

      100% {
        transform: scaleY(1);
      }
    }
  } */

  .none {
    display: none;
  }
`;

const SetNicknamePage = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const { isDuplicate } = useSelector((state: any) => state.auth);
  const [lengthOutOfRange, setLengthOutOfRange] = useState<boolean>(false);
  const [blogTitle1, setBlogTitle1] = useState('');
  const [blogTitle2, setBlogTitle2] = useState('');
  const [count, setCount] = useState(0);

  const nickNameRef = useRef<any>(null);
  const completionWord1 = `개츠비에 오신것을 환영합니다
  캐릭터 닉네임을 설정해주세요.`;
  const completionWord2 = '';

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setBlogTitle1((prevTitleValue) => {
        let result = prevTitleValue
          ? prevTitleValue + completionWord1[count]
          : completionWord1[0];
        setCount(count + 1);

        if (count >= completionWord1.length) {
          setCount(0);
          setBlogTitle1('');
        }

        return result;
      });
    }, 100);

    if (count >= completionWord1.length) {
      clearInterval(typingInterval);
    }
    nickNameRef.current?.classList.remove('none');
    // setTimeout(() => {
    // }, 1200);

    // let typingInterval2: any = null;

    // setTimeout(() => {

    //   typingInterval2 = setInterval(() => {
    //     setBlogTitle1((prevTitleValue) => {
    //       let result = prevTitleValue
    //         ? prevTitleValue + completionWord2[count]
    //         : completionWord2[0];
    //       setCount(count + 1);

    //       if (count >= completionWord2.length) {
    //         setCount(0);
    //         setBlogTitle2('');
    //       }

    //       return result;
    //     });
    //   }, 100);
    // }, 1200);

    // if (count >= completionWord2.length) {
    //   clearInterval(typingInterval2);
    // }

    return () => {
      clearInterval(typingInterval);
      // clearInterval(typingInterval2);
    };
  });
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
    dispatch(authActions.createUserInfoStart({ nickname, profileChar: 0 }));
  };

  return (
    <NickNameContainer>
      <h1 className="maintitle">{blogTitle1}</h1>
      <h1 className="maintitle">{blogTitle2}</h1>
      <div ref={nickNameRef}>
        <input
          onChange={onChangeNickname}
          className="nickNameInput"
          placeholder="닉네임을 입력해주세요"
        />
        {isDuplicate && <p>중복된 닉네임입니다.</p>}
        {lengthOutOfRange && <p>닉네임은 2~6글자만 가능합니다</p>}
        <img
          className="img"
          src={`${process.env.REACT_APP_S3_URL}/profile/0_normal.gif`}
          alt="캐릭터 없음"
        />
        <a
          href="javascript:void(0)"
          className="eightbit-btn"
          onClick={onClickHandler}
        >
          시작하기
        </a>
      </div>
      {/* <button onClick={onClickHandler}>시작 하기</button> */}
    </NickNameContainer>
  );
};

export default SetNicknamePage;
