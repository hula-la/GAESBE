import React from 'react';
import { useDispatch } from 'react-redux';
import { unityActions } from '../../features/unity/unitySlice';
import styled from 'styled-components';

const Side = styled.div`
  width: 18%;
  background-color: #8461f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 60%;
    height: 15%;
  }
  .menubar {
    height: 60%;
    margin-top: 2rem;
  }
  .folder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    height: 20%;
  }
  .foldername {
    margin: 0 auto;
  }
  .menu {
    margin-top: 1.5rem;
  }
`;

const SideBar = () => {
  const dispatch = useDispatch();
  return (
    <Side>
      <img src="/img/Logo.png" alt="Logo" className="logo" />
      <div className="menubar">
        <div
          onClick={() => dispatch(unityActions.changePageNum(0))}
          className="folder"
        >
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">MyHome</p>
        </div>
        <div
          onClick={() => dispatch(unityActions.changePageNum(2))}
          className="folder"
        >
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">Keyboard</p>
        </div>
        <div
          onClick={() => dispatch(unityActions.changePageNum(3))}
          className="folder"
        >
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">Algorithm</p>
        </div>
        <div
          onClick={() => dispatch(unityActions.changePageNum(4))}
          className="folder"
        >
          <img src="/img/FolderBlock.png" alt="menu" className="menu" />
          <p className="foldername">casino</p>
        </div>
      </div>
    </Side>
  );
};

export default SideBar;
