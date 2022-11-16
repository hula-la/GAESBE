import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import RequestToMe from './RequestToMe';
import RequestToYou from './RequestToYou';
import FriendListMange from './FriendListManage';
import InviteFriend from './InviteFriend';

const StyledModal = styled.div`
  padding: 3vmin;
  width: 25vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid #000;
  border-radius: 20px;
  background-color: #f0568c;
  z-index: 1000;
  color: #fff;

`;
const StyledModalDiv = styled.div`
  top: 0%;
  left: 0%;
  position: fixed;
  width: 1000%;
  height: 1000%;
  z-index: 100;
  background-color: rgba(142, 142, 142, 0.4);
`;

function FriendModal({ handleModal, type, client }: any) {
  const [option, setOption] = useState<string | null>('manage');

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      // overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleOption = (e: string) => {
    setOption(null);
    setTimeout(() => {
      setOption(e);
    }, 100);
  };

  return (
    <StyledModalDiv onClick={handleModal}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        {type === 'request' && <RequestToYou />}
        {type === 'invite' && <InviteFriend />}
      </StyledModal>
      
    </StyledModalDiv>
  );
}
export default FriendModal;
