
export default function Counter(props) {
  return (<>
    <div className="counter">
      {/* Player 컴포넌트에서 프롭스를 통해 전달받은 함수를 호출하여
      점수를 증가/감소 시킨다.  */}
      <button className="counter-action decrement"
        onClick={(e) => { 
          // alert('점수차감'); 
          // console.log('-버튼',props.idx);
          //함수 호출시 증감을 위한 플래그와 일련번호를 인수로 전달한다. 
          props.onChangeScore('-',props.idx);
          }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={(e) => { 
          // alert('점수증가'); 
          // console.log('+버튼',props.idx);
          props.onChangeScore('+',props.idx);
          }}> +</button>
    </div>
  </>);
}