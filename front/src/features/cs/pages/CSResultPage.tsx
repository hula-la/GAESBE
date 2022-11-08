import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 82%;
  background-color: #232323;
  color: #ffffff;
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
      {data &&
        data.map((res: any, idx: number) => {
          return (
            <div key={idx}>
              <p>{res[0]}</p>
              <p>{res[2]}</p>
            </div>
          );
        })}
    </Container>
  );
};

export default CSResultPage;
