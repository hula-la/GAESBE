import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CSUser from '../components/CSUser';

import styled from 'styled-components';
import { itemActions } from '../../game/itemSlice';
import Confetti from 'react-confetti';


const Container = styled.div`
  width: 82%;
  height: 100%;
  margin: auto;
  background-color: #232323;
  color: #ffffff;
  /* border: 1px solid #fc0303; */
  text-align: center;
  /* border : 1px solid #fff; */
  .header {
    margin: 5% 0 0 0;
    font-size: 3rem;
    height:10%;
    /* border : 1px solid #fff; */
    background-image: url(/img/titleBackground-long.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 65% 120%;

    display: flex;
    justify-content: center;
    span{
      margin: auto;
    }
  }
  .rank{
    height: 48%;
    /* border : 1px solid #fff; */
    position: relative;
      
    .bg {
      width: 55%;
      min-width: 395px;
      position: absolute;
      /* border : 1px solid #fff; */
      transform: translate(-50%,-5%);
    }
  }
  .myRank{

    width: 80%;
    height: 32%;
    margin: auto;
    border : 5px solid #ff9f00;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fcc976;
    .rankInfo{
      width: 50%;
      height: 70%;
      display: flex;
      flex-direction: column;
      /* border : 1px solid #fff; */
      justify-content: space-around;
      div{
        color:black;
      }
      div:nth-child(1){
        font-size: 1.5rem;
      }

      div:nth-child(2){
        font-size: 2rem;
      }

      div:nth-child(3){
        font-size: 2rem;
      }

    }

    .userInfo{
      /* border : 1px solid #fff; */
      width: 50%;
      img{
      /* width:15%; */
      }
    }

  }
  .user-list {
    height: 54%;
    width:50%;
    min-width: 365px;
    margin:auto;
    display: flex;
    justify-content: center;
    position: relative;
    /* border: 1px solid #fff; */
    div:nth-child(1){
      /* border: 1px solid #fc0303; */
      transform : translate(0,21%);
    }
    div:nth-child(2){
      /* border: 1px solid #fc0303; */
      transform : translate(0,-20%);
    }
    div:nth-child(3){
      transform : translate(0,39%);
      /* border: 1px solid #fc0303; */
    }
    .empty{
      width:400px;
    }
  }


`;


const ranking =[ [23,"닉네임",1,4324],[4,"닉네임",2,2413],[7,"닉네임",19,4253] ];
const rankByPlayer = {
  23:1,
  4:2,
  5:3
}


const CSResultPage = () => {
  const location = useLocation();
  // const { ranking, rankByPlayer } = location.state;

  // useEffect(() => {
  //   if (ranking && rankByPlayer) {
  //     // console.log("ranking>",ranking);
  //     // console.log(rankByPlayer);
  //     console.log(">>",rankByPlayer);
  //   }
  // }, [ranking, rankByPlayer]);
  return (
    <Container>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight / 1.1}
      ></Confetti>
      <div className="header"><span>CS 게임 결과</span></div>
      <div className="rank">
        <div className="user-list">
          {ranking[1] !=null? <CSUser user={ranking[1]} ranking={rankByPlayer}></CSUser>
          :<div className='empty'></div>}
          {ranking[0] !=null? <CSUser user={ranking[0]} ranking={rankByPlayer}></CSUser>
          :<div className='empty'></div>}
          {ranking[2] !=null? <CSUser user={ranking[2]} ranking={rankByPlayer}></CSUser>
          :<div className='empty'></div>}
        </div>
        <img className='bg' src="/img/csResultStand.png"></img>
      </div>
      <div className='myRank'>
        <div className='rankInfo'>
          <div >내 랭킹</div>
          <div >50 등</div>
          <div>5203 점</div>
        </div>
        <div className='userInfo'>
          <CSUser user={ranking[0]}></CSUser>
        </div>
      </div>
    </Container>
  );
};

export default CSResultPage;
