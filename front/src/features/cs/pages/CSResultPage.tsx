import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { itemActions } from '../../game/itemSlice';
import CSUser from '../components/CSUser';

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
  }
  .rank{
    height: 50%;
    /* border : 1px solid #fff; */
    position: relative;
      
    .bg {
      /* background-color: white; */
      width: 60%;
      position: absolute;
      transform: translate(-50%,-5%);
    }
  }
  .myRank{
    height: 40%;
    /* border : 1px solid #fff; */
    img{
      width:15%;
    }
  }
  .user-list {
    display: flex;
    justify-content: center;
    position: relative;
    div:nth-child(1){
      /* border: 1px solid #fc0303; */
      transform : translate(0,20%);
    }
    div:nth-child(2){
      /* border: 1px solid #fc0303; */
      transform : translate(0,-8%);
    }
    div:nth-child(3){
      transform : translate(0,38%);
      /* border: 1px solid #fc0303; */
    }
  }
  .user-item {
    /* border: 1px solid #ffffff; */
  }

`;

const CSResultPage = () => {
  const location = useLocation();
  const { ranking, rankByPlayer } = location.state;
  useEffect(() => {
    if (ranking && rankByPlayer) {
      console.log("ranking >>",ranking);
      // console.log(rankByPlayer);
      console.log("rankByPlayer>>",rankByPlayer);
    }
  }, [ranking, rankByPlayer]);
  return (
    <Container>
      <div className="header">CS 게임 결과</div>
      <div className="rank">
        <div className="user-list">
          <CSUser user={ranking[0]} ranking={rankByPlayer}></CSUser>
          <CSUser user={ranking[0]}></CSUser>
          <CSUser user={ranking[0]}></CSUser>
        </div>
        <img className='bg' src="/img/csResultStand.png"></img>
      </div>
      <div className='myRank'>
        <CSUser user={ranking[0]}></CSUser>
      </div>
    </Container>
  );
};

export default CSResultPage;
