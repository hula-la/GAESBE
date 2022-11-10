import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Side = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NeoDunggeunmo';

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
    .folder {
      display: flex;
      align-items: center;
      height: 13%;
      width: 100%;
      margin-bottom: 1.5rem;
      margin-left: 2.5rem;
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
            src={`${process.env.REACT_APP_S3_URL}/profile/1_normal.gif`}
            className="profileImg"
            alt="profileImg"
          />
        </div>
      )}
      <div className="menubar">
        <div onClick={() => handleOnClick('')} className="folder">
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">MYROOM</p>
        </div>
        <div onClick={() => handleOnClick('typing')} className="folder">
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">TYPING</p>
        </div>
        <div onClick={() => handleOnClick('algo')} className="folder">
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">ALGORITHM</p>
        </div>
        <div onClick={() => handleOnClick('CS')} className="folder">
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">CS</p>
        </div>
        <div onClick={() => handleOnClick('casino')} className="folder">
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">MINI</p>
        </div>
      </div>
    </Side>
  );
};

export default SideBar;
