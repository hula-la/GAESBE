import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

    padding: 15% 0;

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
        font-size: 23px;
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

  const { userInfo } = useSelector((state: any) => state.auth);

  const handleOnClick = (path: string) => {
    navigate(path);
  };
  return (
    <Side>
      <div className="logoBox">
        <img src="/img/Logo.png" alt="Logo" className="logo" />
      </div>
      {userInfo && (
        <div className="profileBox">
          <div className="profileInfo">
            <div className="nickname">{userInfo.nickname}</div>
            <div>Lv1. 반지하</div>
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
          <p className="foldername">MYROOM</p>
        </div>
        <div onClick={() => handleOnClick('typing')} className="folder">
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
          <p className="foldername">TYPING</p>
        </div>
        <div onClick={() => handleOnClick('algo')} className="folder">
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
          <p className="foldername">ALGORITHM</p>
        </div>
        <div onClick={() => handleOnClick('CS')} className="folder">
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
          <p className="foldername">CS</p>
        </div>
        <div onClick={() => handleOnClick('casino')} className="folder">
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
          <p className="foldername">MINI</p>
        </div>
      </div>
    </Side>
  );
};

export default SideBar;
