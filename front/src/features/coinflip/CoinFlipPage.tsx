import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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
  const [flagment, setFlagment] = useState(false);
  const coinRef = useRef<HTMLDivElement | null>(null);
  const onClickFlip = () => {
    let i = Math.floor(Math.random() * 2);
    coinRef.current!.style.animation = 'none';
    if (i) {
      if (flagment) {
        coinRef.current!.style.animation = 'bk-spin-bk 3s forwards';
        setFlagment(true);
      } else {
        coinRef.current!.style.animation = 'fr-spin-fr 3s forwards';
        setFlagment(false);
      }
    } else {
      if (flagment) {
        coinRef.current!.style.animation = 'bk-spin-fr 3s forwards';
        setFlagment(false);
      } else {
        coinRef.current!.style.animation = 'fr-spin-bk 3s forwards';
        setFlagment(true);
      }
    }
  };
  return (
    <Container>
      {/* <div className="stats">
        <p id="heads-count">Heads: 0</p>
        <p id="tails-count">Tails: 0</p>
      </div> */}
      <div className="title">
        <img src="img/gametitle/gametitle1.png" />
      </div>
      <div ref={coinRef} className="coin">
        <div className="heads">
          <img src="img/coin/head.png" />
        </div>
        <div className="tails">
          <img src="img/coin/tail.png" />
        </div>
        <div className="tails"></div>
      </div>
      <div className="buttons">
        <button onClick={onClickFlip} id="flip-button">
          Flip Coin
        </button>
      </div>
    </Container>
  );
};

export default CoinFlipPage;
