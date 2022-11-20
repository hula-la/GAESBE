import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CsMain = styled.div`
  width: 100%;
  height: 100%;
  background-color: #232323;
  justify-content: center;
  text-align: center;
  color: white;

  position: relative;
  .arrowImg {
    transform: scaleX(-1);
    padding: 1rem;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.3s;
    :hover {
      transform: scaleX(-1.2) scaleY(1.2);
      cursor: url('/img/cursor/hover_cursor.png'), auto;
    }
  }
  .title {
    text-align: center;
    /* height: 25%; */
    width: 100%;
    padding: 10% 0;
    img {
      width: 50%;
    }
  }
`;

const SelectGameType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* height: 10rem; */
  /* border: 2px solid red; */
  margin-bottom: 10%;

  position: absolute;
  width: 100%;
  bottom: 0;
`;

const SelectGameTypeBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  align-items: center;

  overflow-y: hidden;
  overflow-x: auto;
  padding: 2rem 2rem;

  /* position: relative; */
  /* border: 2px solid blue; */

  /* :active {
    background-color: white;
  } */
  :hover {
    transform: translateY(-5%);
    transition: all 0.2s linear;
    cursor: url('/img/cursor/hover_cursor.png'), auto;
  }

  .relative {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .imgBox {
    /* background: white; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    &.random {
      background-color: #ffc02d57;
    }
    &.friend {
      background-color: #b468da46;
    }

    :hover {
      background: #ececec2b;
    }

    /* box-shadow: 0px 0px 9px 1px #6f43ff; */

    border-radius: 0.4rem;

    animation-name: showToIconBg;
    animation-duration: 2s;
    @keyframes showToIconBg {
      0% {
        transform: translateY(-100%);
      }
      50% {
        transform: translateX(0);
      }
    }
    img {
      width: 80%;
      padding: 10%;

      animation-name: showToIcon;
      animation-duration: 2s;
      @keyframes showToIcon {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }

  .langName {
    position: absolute;
    /* background: #4e4e4e; */

    font-weight: bold;

    top: 70%;
    right: -2rem;
    overflow: hidden;

    div {
      width: 100%;
      height: 100%;
      background: #4e4e4e;
      padding: 0.4rem;
      box-sizing: border-box;

      animation-name: showToLangName;
      animation-duration: 2s;

      @keyframes showToLangName {
        0% {
          transform: translateX(-130%);
          opacity: 0;
        }
        50% {
          transform: translateX(-130%);
          opacity: 0;
          /* display: none; */
        }
        50% {
          transform: translateX(-50%);
          color: #4e4e4e;
        }
        100% {
          transform: translateX(0);
          color: white;
        }
      }
    }
  }
`;

const CSgamePage = () => {
  const navigate = useNavigate();

  // 랜덤매칭 페이지로 이동
  const onClickRandom = () => {
    navigate('random');
  };

  // 친선전 오픈
  const onClickFriend = () => {
    navigate('friend', { state: { shareCode: null } });
  };

  return (
    <CsMain>
      <img
        onClick={() => navigate('/game/select')}
        src="/img/arrow/back-arrow.png"
        alt=""
        className="arrowImg"
      />
      <div className="title">
        <img src="/img/gametitle/gametitle6.png" alt="title" />
      </div>

      <h1 className="content">CS를 신속 정확하게 풀어 1등을 쟁취하라!</h1>

      <SelectGameType>
        <SelectGameTypeBox onClick={onClickRandom} className="random">
          <div className="relative">
            <div className="imgBox random">
              <img className="questionMark" src="/img/questionMark.png" />
              <div className="langName">
                <div>랜덤 매칭</div>
              </div>
            </div>
          </div>
        </SelectGameTypeBox>

        <SelectGameTypeBox onClick={onClickFriend} className="friend">
          <div className="relative">
            <div className="imgBox friend">
              <img className="questionMark" src="/img/friendMark.png" />
              <div className="langName">
                <div>방 만들기</div>
              </div>
            </div>
          </div>
        </SelectGameTypeBox>
      </SelectGameType>
    </CsMain>
  );
};

export default CSgamePage;
