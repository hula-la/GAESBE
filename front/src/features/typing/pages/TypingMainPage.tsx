import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../components/Common/retroBtn.css';
import TypingModal from '../components/TypingModal';

// import "src/components/retroBtn.css";

const TypingMain = styled.div`
  .aniToDown {
    animation-name: showToIconBg;
    animation-duration: 2s;

    @keyframes showToIconBg {
      0% {
        transform: translateY(-100%);
      }
      50% {
        transform: translateY(0);
      }
    }
  }
  .img {
    position: absolute;
    /* width: 3%; */
    top: 5%;
    left: 20%;
    transform: scaleX(-1);
  }
  height: 100%;
  width: 100%;

  background-color: #232323;
  justify-content: center;
  text-align: center;
  color: white;
  .title {
    text-align: center;
    height: 25%;
    width: 100%;
    margin: 2rem 0;
    img {
      width: 60%;
    }
    .question {
      width: 3%;
    }
  }
`;
const SelectLanguage = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  /* border: 2px solid red; */
  /* margin-bottom: 5rem; */

  .hand {
    position: absolute;

    /* left:0; */
    bottom: 1rem;

    width: 50%;

    /* transition: all 1s linear; */
    display: none;
  }
  .hand.show {
    /* right: calc(50% - 5rem); */
    display: block;
  }
`;
const SelectLanguageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 17rem;
  /* height: 17rem; */
  align-items: center;

  padding: 2rem 2rem;

  img {
    width: 100%;
    /* padding: 10%; */

    animation-name: showToIcon;
    animation-duration: 1s;
    @keyframes showToIcon {
      0% {
        transform: translateY(-30%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  :hover {
    transform: translateY(-5%);
    transition: all 0.2s linear;
    cursor: url('/img/cursor/hover_cursor.png'), auto;
  }

  .imgBox {
    width: 100%;
    height: 100%;
  }

  .langName {
    position: absolute;
    /* background: #4e4e4e; */

    font-weight: bold;

    /* top: 70%;
    right: -2rem; */
    overflow: hidden;

    top: 1rem;

    div {
      width: 100%;
      height: 100%;
      background: #4e4e4e;
      padding: 0.5rem;
      box-sizing: border-box;

      border-radius: 0.6rem;

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
const SelectGameType = styled.div`
  display: flex;
  justify-content: center;

  animation-name: showToBtn;
  animation-duration: 2s;

  @keyframes showToBtn {
    0% {
      transform: translateY(100%);
    }
    50% {
      transform: translateY(0);
    }
  }

  a {
    margin: 1rem;
  }
`;
const SelectTypeBox = styled.div`
  button {
    padding: 1rem;
  }
`;
function TypingMainPage() {
  const [gameType, setGameType] = useState<String>('PYTHON');
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [shareCode, setShareCode] = useState<String>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleFriendGame = () => {
    setIsOpen((prev) => !prev);
  };
  const handleRandomGame = () => {
    navigate('enter', { state: { lang: gameType } });
  };
  const handleChoicePython = () => {
    setGameType('PYTHON');
    // console.log('파이썬 선택');
  };
  const handleChoiceJava = () => {
    setGameType('JAVA');
    // console.log('자바 선택');
  };
  const onClickCreateRoom = () => {
    navigate('friend', { state: { lang: gameType, shareCode: null } });
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <TypingMain>
      <img
        className="img"
        onClick={() => navigate('/game/select')}
        src="/img/arrow/back-arrow.png"
        alt=""
      />
      <div className="aniToDown">
        <div className="title">
          {/* <img src="/img/gametitle/gametitle2.png" alt="title" /> */}
          <img src="/img/gametitle/GameTitle7.png" alt="" />
          <img
            onClick={openModal}
            className="question"
            src="/img/questionMark-gray.png"
          ></img>
        </div>
        {modalOpen && <TypingModal setModalOpen={setModalOpen} />}
        <h1>타이핑 연습을 하면서 언어와 친해지자</h1>
        <SelectLanguage>
          <SelectLanguageBox onClick={handleChoicePython}>
            <div className="imgBox">
              <img
                className="gaze"
                src={`/img/langIcon/python_WCom.png`}
                alt="luck_exp"
              />
            </div>
            <div className="langName">
              <div>Python</div>
            </div>

            <img
              className={`hand ${gameType == 'PYTHON' ? 'show' : ''}`}
              src={`/img/langIcon/hand.png`}
              alt="luck_exp"
            />
          </SelectLanguageBox>
          <SelectLanguageBox onClick={handleChoiceJava}>
            <div className="imgBox">
              <img
                className="gaze"
                src={`/img/langIcon/java_WCom.png`}
                alt="luck_exp"
              />
            </div>
            <div className="langName">
              <div>Java</div>
            </div>
            <img
              className={`hand ${gameType == 'JAVA' ? 'show' : ''}`}
              src={`/img/langIcon/hand.png`}
              alt="luck_exp"
            />
          </SelectLanguageBox>
        </SelectLanguage>
        <div>
          <h3>언어를 선택해주세요</h3>
        </div>
      </div>
      <SelectGameType>
        <SelectTypeBox>
          <a
            href="javascript:void(0)"
            className="eightbit-btn"
            onClick={handleRandomGame}
          >
            랜덤매칭
          </a>
        </SelectTypeBox>
        <SelectTypeBox>
          <a
            href="javascript:void(0)"
            className="eightbit-btn eightbit-btn--proceed"
            onClick={onClickCreateRoom}
          >
            방만들기
          </a>
        </SelectTypeBox>
      </SelectGameType>
    </TypingMain>
  );
}

export default TypingMainPage;
