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
  border: 1px solid #fc0303;
  text-align: center;
  .user-list {
    display: flex;
    div:nth-child(1){
      /* border: 1px solid #fc0303; */
    }
    div:nth-child(2){
      /* border: 1px solid #fc0303; */
    }
    div:nth-child(3){
      /* border: 1px solid #fc0303; */
    }
  }
  .user-item {
    border: 1px solid #ffffff;
  }
  .header {
    margin: 10% 0 0 0;
    font-size: 5rem;
  }
  .bg {
    /* background-color: white; */
    width: 80%;
  }
`;

const CSResultPage = () => {
  const location = useLocation();
  const { ranking, rankByPlayer } = location.state;
  useEffect(() => {
    if (ranking && rankByPlayer) {
      console.log(ranking);
      console.log(rankByPlayer);
    }
  }, [ranking, rankByPlayer]);
  return (
    <Container>
      <div className="header">CS 게임 결과</div>
      <div className="rank">
        <div className="user-list">
          <CSUser user={ranking[0]}></CSUser>
          <CSUser user={ranking[0]}></CSUser>
          <CSUser user={ranking[0]}></CSUser>
        </div>
        <img className='bg' src="/img/csResultBackground.png"></img>
      </div>
    </Container>
  );
};

export default CSResultPage;
