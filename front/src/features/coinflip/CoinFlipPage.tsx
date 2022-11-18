import { relative } from 'path';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { coinActions } from './coinFlipSlice';

const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: #232323;
  color: #fff;
  .arrowImg{
    transform: scaleX(-1);
    padding: 1rem;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.3s;
    :hover{
      transform: scaleX(-1.2) scaleY(1.2);
      cursor: url('/img/cursor/hover_cursor.png'), auto;

    }
  }
  .stats {
    text-align: right;
    color: #ffffff;
    font: 25px;
    line-height: 25px;
  }
  .title {
    text-align: center;
    height: 15%;
    padding-top: 2%;
    img {
      height: 100%;
    }
  }
  .coin {
    height: 40%;
    width: 100%;
    position: relative;
    /* margin: auto; */
    margin-bottom: 2%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
  }
  .coin img {
    height: 100%;
  }
  .heads {
    position: absolute;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .tails {
    position: absolute;
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
    height: 8%;
  }
  button {
    width: 120px;
    padding: 10px 0;
    border: 2.5px solid #424ae0;
    border-radius: 5px;
    cursor: pointer;
  }
  #flip-button {
    width:18%;
    /* background-image: url(/img/selectbutton/ssafy/pushButton_blue1.png); */
    /* background-color: #424ae0; */
    color: #ffffff;
    background-size:100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      margin-bottom:10%;
    }
  }
  .flip-btn-blue{
    background-image: url(/img/selectbutton/ssafy/pushButton_blue1.png);
  }

  .exit-btn{
    /* transition: all 0.5s; */
    padding: 1rem;
    :hover{
      /* transform: scale(1.2);  */
      color: #b5b5b5;
      cursor: url('/img/cursor/hover_cursor.png'), auto;
    }
  }

  .flip-btn-red{
    background-image: url(/img/selectbutton/ssafy/pushButton_red1.png);
  }
  .flip-btn-blue:hover{
    cursor: url('/img/cursor/hover_cursor.png'), auto;
    background-image: url(/img/selectbutton/ssafy/pushButton_blue2.png);
  }
  .flip-btn-red:hover{
    cursor: url('/img/cursor/hover_cursor.png'), auto;
    background-image: url(/img/selectbutton/ssafy/pushButton_red2.png);
  }

  .ranking-list{
    margin: 3% auto;
    border: 5px solid #000;
    border-radius: 10px;
    background-color: #6f43ff;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height:15%;
    width:80%;
    padding-bottom:0.4rem;
    /* position: relative; */

    p{
      width: 5em;
      margin: 0;
      padding: 3%;
    }
    p.rank-info{
      display: flex;
      justify-content: space-between;
      img{
        
      }
      span{
        margin: auto;
      }
    }
    p.rank-name{
      text-align: center;
      border : 1px solid #000;
      padding:5% 10%;
      border-radius: 20px;
      color:#fff;
      background-color: #232323;
    }

  }

  .win{
    margin:auto;
    width:80%;
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    span{
      color: black;
      padding: 3% 4%;
      border-radius: 30px;
      border: 5px solid #000;
    }
    div{
      width: 100%;
    }
  }
  .win-max{
    text-align: left;
    span{
      background-color: #f0568c;
    }
  }
  .win-now{
    text-align: right;
    span{
      background-color: #ffc02d;
    }
  }

`;

const CoinFlipPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coinRef = useRef<HTMLDivElement | null>(null);
  const { result } = useSelector((state: any) => state.coin);
  const { ranking } = useSelector((state: any) => state.coin);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBeting, setIsBeting] = useState<boolean>(false);
  const [flagment, setFlagment] = useState(false);

  const onClickBet = () => {
    setIsBeting(true);
  };
  const onClickBetSSa = () => {
    dispatch(coinActions.requestCoinFlipStart({ patten: 6 }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };
  const onClickBetFy = () => {
    dispatch(coinActions.requestCoinFlipStart({ patten: 7 }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  const onClickRun = () => {
    setIsBeting(false);
  };

  const coinFlip = () => {
    coinRef.current!.style.animation = 'none';
    setTimeout(() => {
      if (result.patten === 7) {
        if (flagment) {
          coinRef.current!.style.animation = 'bk-spin-bk 3s forwards';
          setFlagment(true);
          dispatch(coinActions.resetResult());
        } else {
          coinRef.current!.style.animation = 'fr-spin-bk 3s forwards';
          setFlagment(true);
          dispatch(coinActions.resetResult());
        }
      } else {
        if (flagment) {
          coinRef.current!.style.animation = 'bk-spin-fr 3s forwards';
          setFlagment(false);
          dispatch(coinActions.resetResult());
        } else {
          coinRef.current!.style.animation = 'fr-spin-fr 3s forwards';
          setFlagment(false);
          dispatch(coinActions.resetResult());
        }
      }
    }, 10);
  };

  useEffect(() => {
    dispatch(coinActions.fetchSsafyRecordStart());
  }, []);

  useEffect(() => {
    if (result) {
      coinFlip();
      if (result.correct) {
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: '축하합니다!',
            text: `${result.winningStreak}연승 중입니다!`,
          });
          dispatch(coinActions.fetchSsafyRecordStart());
        }, 3500);
      } else {
        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: '아...아쉽네요',
            text: `다시 도전해보세요`,
          });
          dispatch(coinActions.fetchSsafyRecordStart());
        }, 3500);
      }
    }
  }, [result]);

  return (
    <Container>
      <img
        onClick={() => navigate('/game/select')}
        src="/img/arrow/back-arrow.png"
        alt=""
        className='arrowImg'
      />
      <div className="title">
        <img src="/img/gametitle/gametitle3.png" alt="title" />
      </div>

      <div className='ranking-list'>
        {ranking &&
          ranking['list'].map((rank: any, idx: any) => {
            return (
              <div className='ranking-itme' style={{ fontSize:`${24/((idx*0.1+1))}px`}} key={idx}>
                <p className='rank-info'>
                  <span>
                    {idx<3?<img src={`/img/rank/medal${idx}.png`} style={{width:`${30/((idx*0.2+1))}px`}} alt={`${idx+1}등`} />
                    :<span>{idx+1}등</span>
                    }
                    </span>
                  <span>{rank.max_win_streak}연승</span>
                </p>
                <p className='rank-name'>{rank.nickName} </p>
              </div>
            );
          })}
      </div>
      {ranking && (
        <div className='win'>
          <div className='win-max'>내 최대 연승 <span>{ranking.myWinMaxWinStreak}</span></div>
          <div className='win-now'><span>{ranking.myWinningStreak}</span> 연승 중~</div>
        </div>
      )}
      <div ref={coinRef} className="coin">
        <div className="heads">
          <img src="/img/coin/head.png" alt="head" />
        </div>
        <div className="tails">
          <img src="/img/coin/tail.png" alt="tail" />
        </div>
      </div>

      <div className="buttons">
        {!isBeting && !isLoading && (
          <div onClick={onClickBet} id="flip-button" className='flip-btn-blue'>
            <span>베팅!</span>
          </div>
        )}
        {isBeting && !isLoading && (
          <>
            <div onClick={onClickBetSSa} id="flip-button" className='flip-btn-red'>
               <span>이번엔 싸다!</span>
            </div>
            <div onClick={onClickRun} id="flip-button">
               <span className='exit-btn'>돔황챠</span>
            </div>
            <div onClick={onClickBetFy} id="flip-button" className='flip-btn-blue'>
               <span>아니지 피다!</span>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default CoinFlipPage;
