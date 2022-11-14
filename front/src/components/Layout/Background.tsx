import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const BackgroundBlock = styled.div`
  background-image: url(/img/Intro/Intro1.jpg);
  /* background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed; */
  height: 100vh;
`;

const Background = () => {
  return (
    <BackgroundBlock>
      <Outlet />
    </BackgroundBlock>
  );
};

export default Background;
