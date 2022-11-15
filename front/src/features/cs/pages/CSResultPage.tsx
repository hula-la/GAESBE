import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 82%;
  height: 100%;
  margin: auto;
  background-color: #232323;
  color: #ffffff;
  border: 1px solid #fc0303;
  text-align: center;
  .user-list{
    display: flex;
  }
  .user-item{
    border: 1px solid #ffffff;
  }
  .header{
    margin: 10% 0 0 0;
    font-size : 5rem;
  }
  img{
    background-color: white;
    width:100%;
  }
`;

const CSResultPage = () => {
  const location = useLocation();
  const { result, players } = location.state;
  const [data, setData] = useState<any>();
  let results: any = [];
  useEffect(() => {
    if (result && players) {
      const tempId = Object.keys(result.score);
      const tempScore = Object.values(result.score);

      for (let i = 0; i < tempId.length; i++) {
        const a = players.filter((player: any) => {
          return player.id == tempId[i];
        });
        results.push([a[0].nickname, tempId[i], tempScore[i]]);
      }
      setData(results);
    }
  }, [result, players]);
  return (
    <Container>
      <div className='header'>
        CS 게임 결과
      </div>
      <div className='rank'>
        <div className='user-list'>
            {data &&
              data.map((res: any, idx: number) => {
                return (
                  <div className='user-item' key={idx}>
                    <p>{res[0]}</p>
                    <p>{res[1]}</p>
                    <p>{res[2]}</p>
                  </div>
                );
              })}
          </div>
        <img src='/img/csResultBackground.png'></img>
      </div>
    </Container>
  );
};

export default CSResultPage;
