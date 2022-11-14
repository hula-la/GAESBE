import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { coinActions } from './coinFlipSlice';

const Container = styled.div`
  width: 82%;
  background-color: #232323;
  color: aqua;
  .stats {
    text-align: right;
    color: #ffffff;
    font: 25px;
    line-height: 25px;
  }
  .title {
    text-align: center;
    height: 30%;
    img {
      height: 60%;
    }
  }
  .coin {
    height: 50%;
    width: 50%;
    position: relative;
    margin: 50px auto;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .coin img {
    width: 100%;
    height: 100%;
  }
  .heads {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .tails {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .tails {
    transform: rotateX(180deg);
  }
  .noanimation {
    animation: none;
  }
  .heads-spin {
    animation: spin-heads 3s forwards;
  }
  .tails-spin {
    animation: spin-tails 3s forwards;
  }

  @keyframes fr-spin-bk {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(1980deg);
    }
  }
  @keyframes fr-spin-fr {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(2160deg);
    }
  }
  @keyframes bk-spin-fr {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(2160deg);
    }
  }
  @keyframes bk-spin-bk {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(2340deg);
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
  }
  button {
    width: 120px;
    padding: 10px 0;
    border: 2.5px solid #424ae0;
    border-radius: 5px;
    cursor: pointer;
  }
  #flip-button {
    background-color: #424ae0;
    color: #ffffff;
  }
`;

const CoinFlipPage = () => {
  const dispatch = useDispatch();
  const coinRef = useRef<HTMLDivElement | null>(null);
  const { result } = useSelector((state: any) => state.coin);
  const [flagment, setFlagment] = useState(false);

  const onClickBet = () => {
    dispatch(coinActions.requestCoinFlipStart({ patten: 6, point: 0 }));
  };

  const coinFlip = () => {
    coinRef.current!.style.animation = 'none';
    if (result.patten === 7) {
      if (flagment) {
        coinRef.current!.style.animation = 'bk-spin-bk 3s forwards';
        setFlagment(true);
      } else {
        coinRef.current!.style.animation = 'fr-spin-bk 3s forwards';
        setFlagment(true);
      }
    } else {
      if (flagment) {
        coinRef.current!.style.animation = 'bk-spin-fr 3s forwards';
        setFlagment(false);
      } else {
        coinRef.current!.style.animation = 'fr-spin-fr 3s forwards';
        setFlagment(false);
      }
    }
  };

  useEffect(() => {
    if (result) {
      coinFlip();
    }
  }, [result]);

  return (
    <Container>
      {/* <div className="stats">
        <p id="heads-count">Heads: 0</p>
        <p id="tails-count">Tails: 0</p>
      </div> */}
      <div className="title">
        <img src="/img/gametitle/gametitle3.png" alt="title" />
      </div>
      <div ref={coinRef} className="coin">
        <div className="heads">
          <img src="/img/coin/head.png" alt="head" />
        </div>
        <div className="tails">
          <img src="/img/coin/tail.png" alt="tail" />
        </div>
        <div className="tails"></div>
      </div>
      <div className="buttons">
        <button onClick={onClickBet} id="flip-button">
          베팅!
        </button>
      </div>
    </Container>
  );
};

export default CoinFlipPage;
