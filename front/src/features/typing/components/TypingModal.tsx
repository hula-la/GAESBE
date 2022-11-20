import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  width: 45vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  border: 5px solid black;
  border-radius: 20px;
  background-color: #f0568c;
  z-index: 1000;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  .close {
    position: absolute;
    right: 4%;
    top: 2%;
    padding: 0.4rem;

    transition: all 0.2s linear;
      :hover {
        transform: scale(1.1);
        cursor: url('/img/cursor/hover_cursor.png'), auto;
      }
  }

  .infoImgContainerBox{
    width: 95%;
    height: 90%;
    background: white;
    margin-top: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
  }

  .infoImgContainer{
    width: 95%;
    height: 95%;
    overflow-y: auto;
    

    &::-webkit-scrollbar {
        width: 1rem;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #f42746;
        border-radius: 30px;
        background-clip: padding-box;
        border: 2px solid transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: #ffc7c7;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
      }
  }

  .infoImg{
    width: 100%;
    
  }
`;

function TypingModal({ setModalOpen }: any) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <img className="close" onClick={closeModal} src="/img/close.png" alt="" />
      <div className="infoImgContainerBox">

        <div className="infoImgContainer">
        <img className="infoImg" src="/img/gameDescription/typingInfo.png" alt="" />

        </div>
      </div>

    </Container>
  );
}
export default TypingModal;
