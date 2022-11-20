import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { itemActions } from '../../features/game/itemSlice';
import { authActions } from '../../features/auth/authSlice';
import { A } from 'chart.js/dist/chunks/helpers.core';
const Side = styled.div`
  width: 18vw;
  min-width: 12rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NeoDunggeunmo';

  z-index: 5;

  position: relative;

  /* transition: all 0.5s linear;
  transform: translateX( 50px ); */
  animation-name: showToRight;
  animation-duration: 1s;

  @keyframes showToRight {
    0% {
      transform: translateX(-16vw); /* 애니메이션이 0%만큼 동작시 */
      // 몇 줄을 넣어도 상관없다!!
    }
    50% {
      transform: translateX(1vw); /* 애니메이션이 50%만큼 동작시 */
    }
    100% {
      transform: translateX(0); /* 애니메이션이 100%만큼 동작시 */
    }
  }

  .logoBox {
    height: 13%;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 3px solid #000000;
    background: #f0568c;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 60%;
      height: 90%;
    }
  }
  .profileBox {
    position: relative;
    width: 100%;
    height: 13%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 3px solid #000000;
    background: #ffffff;
    display: flex;
    align-items: center;
    .profileImg {
      position: absolute;
      bottom: -5px;
      right: 0;
      height: 150%;
    }
    .profileInfo {
      margin-left: 1rem;
    }
    .nickname {
      font-size: 30px;
      font-weight: 600;
    }
    .userLv {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: 20px;
    }
  }
  .menubar {
    height: 90%;
    box-sizing: border-box;
    width: 100%;
    border: 3px solid #000000;
    border-radius: 10px;
    background: #6f43ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;

    padding-bottom: 10%;
    .logoutfolder {
      display: flex;
      align-items: center;
      position: absolute;
      width: 60%;

      bottom: 1rem;
      left: 0;

      transition: all 0.2s linear;
      :hover {
        transform: translateY(-0.5vh);
        cursor: url('/img/cursor/hover_cursor.png'), auto;
      }

      :hover p {
        display: block;
      }

      p {
        display: none;
        border-radius: 0.3rem;
        background: black;
        color: white;
        padding: 0.2rem;
      }
    }
    .logout {
      display: flex;
      width: 30%;
      height: 80%;
      /* height: 60%; */
      padding-left: 6%;
    }

    .folder {
      display: flex;
      align-items: center;
      height: 13%;
      width: 100%;
      position: relative;
      /* position: absolute; */
      /* margin-bottom: 1.5rem; */
      /* margin-left: 2.5rem; */

      .folderIcon {
        position: absolute;
        margin-left: 4%;
      }

      transition: all 0.2s linear;
      :hover {
        transform: translateY(-1vh);
        cursor: url('/img/cursor/hover_cursor.png'), auto;
      }

      .folderClose {
        width: 4rem;
        /* height: 100%; */
        left: 4%;
      }

      :hover .folderClose {
        opacity: 0;
      }

      .folderOpen {
        opacity: 0;
        width: 4rem;
        /* height:102%; */
      }

      :hover .folderOpen {
        opacity: 100;
      }

      .menu {
        height: 75%;
      }
      .foldername {
        font-style: normal;
        font-weight: 400;
        font-size: 1.3rem;
        line-height: 30px;
        color: #ffffff;
        margin-left: 1rem;
        margin-top: 2rem;
        left: 37%;
        position: relative;
      }
    }
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAbility } = useSelector((state: any) => state.auth);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { offices } = useSelector((state: any) => state.item);
  const [officeList, setOfficeList] = useState<any>(null);
  const handleOnClick = (path: string) => {
    navigate(path);
  };

  const onClickLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };
  useEffect(() => {
    if (offices) {
      setOfficeList(offices);
    }
  }, [offices]);
  let officelist = officeList && officeList.filter((ele: any) => ele.own);
  console.log(userInfo);
  // console.log(userAbility, '여기요');
  // console.log(userAbility.algorithmLv);
  // console.log(userAbility.csLv);
  // console.log(userAbility.luckLv);
  // console.log(userAbility.typingLv);

  return (
    <Side>
      <div className="logoBox">
        <img src="/img/Logo.png" alt="Logo" className="logo" />
      </div>
      {userInfo && (
        <div className="profileBox">
          <div className="profileInfo">
            <div className="nickname">{userInfo.nickname}</div>
            <div className="userLv">
              <div className="userAbilityLv">
                Lv. 
                {userInfo.officeLv} 
              </div>
              <div className="userRoomLv">
                {officelist && officelist[officelist.length - 1].name}
              </div>
            </div>
            {/* <div>Lv1. 반지하</div> */}
          </div>
          <img
            src={`${process.env.REACT_APP_S3_URL}/profile/${userInfo.profileChar}_normal.gif`}
            className="profileImg"
            alt="profileImg"
          />
        </div>
      )}
      <div className="menubar">
        <div onClick={() => handleOnClick('')} className="folder">
          {/* <div className='folderImg'></div> */}
          <img
            src="/img/folderIcon/FolderClose.png"
            alt="menu"
            className="folderIcon folderClose"
          />
          <img
            src="/img/folderIcon/FolderOpen.png"
            alt="menu"
            className="folderIcon folderOpen"
          />
          <p className="foldername">내 오피스</p>
        </div>
        <div onClick={() => handleOnClick('select')} className="folder">
          <img
            src="/img/folderIcon/FolderClose.png"
            alt="menu"
            className="folderIcon folderClose"
          />
          <img
            src="/img/folderIcon/FolderOpen.png"
            alt="menu"
            className="folderIcon folderOpen"
          />
          <p className="foldername">게임</p>
        </div>
        <div onClick={() => handleOnClick('ranking')} className="folder">
          <img
            src="/img/folderIcon/FolderClose.png"
            alt="menu"
            className="folderIcon folderClose"
          />
          <img
            src="/img/folderIcon/FolderOpen.png"
            alt="menu"
            className="folderIcon folderOpen"
          />
          <p className="foldername">랭킹</p>
        </div>
        <div onClick={() => handleOnClick('mypage')} className="folder">
          <img
            src="/img/folderIcon/FolderClose.png"
            alt="menu"
            className="folderIcon folderClose"
          />
          <img
            src="/img/folderIcon/FolderOpen.png"
            alt="menu"
            className="folderIcon folderOpen"
          />
          <p className="foldername">마이페이지</p>
        </div>
        {/* <button onClick={onClickLogout}>로그 아웃</button> */}
        <div onClick={onClickLogout} className="logoutfolder">
          {/* <img className="logout" src="/img/login/logout.png" alt="" /> */}
          <img className="logout" src="/img/login/logout1.png" alt="" />
          {/* <img className="logout2" src="/img/login/logout2.png" alt="" /> */}
          <p>로그아웃</p>
        </div>
      </div>
    </Side>
  );
};

export default SideBar;
