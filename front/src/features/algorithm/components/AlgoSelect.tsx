


function AlgoSelect(client: any) {
  console.log(client)
  window.onbeforeunload = function() {
    return "게임에서 자동으로 기권처리 됩니다";
  }
  return<>
    <h2>문제 선택 컴포넌트</h2>
  </>
}
export default AlgoSelect