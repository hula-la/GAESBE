import styled from 'styled-components';

const Container = styled.div`
  padding: 3vmin;
  width: 40vw;
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
    right: 5%;
    top: 5%;
  }
`;

function CSModal({ setModalOpen }: any) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <img className="close" onClick={closeModal} src="/img/close.png" alt="" />

      <p>이미지 넣으세요.</p>
    </Container>
  );
}
export default CSModal;
