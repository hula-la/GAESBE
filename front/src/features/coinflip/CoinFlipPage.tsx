import React from 'react';
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
  .coin {
    height: 60%;
    width: 60%;
    position: relative;
    margin: 50px auto;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    animation: spin-heads 3s forwards;
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
  @keyframes spin-tails {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(1980deg);
    }
  }
  @keyframes spin-heads {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(2160deg);
    }
  }
`;

const CoinFlipPage = () => {
  return (
    <Container>
      <div className="stats">
        <p id="heads-count">Heads: 0</p>
        <p id="tails-count">Tails: 0</p>
      </div>
      <div className="coin">
        <div className="heads">
          <img src="img/coin/head.png" />
        </div>
        <div className="tails">
          <img src="img/coin/tail.png" />
        </div>
        <div className="tails"></div>
      </div>
    </Container>
  );
};

export default CoinFlipPage;
