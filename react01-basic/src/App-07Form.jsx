import { useState } from "react";

//Top컴포넌트 정의
function Top(props){
  return (
    <h2><a href="/" onClick={(event)=>{
      //이벤트 객체를 통해 화면의 새로고침(하이퍼링크 이동) 차단
      event.preventDefault();
      /*프롭스로 전달된 함수를 호출한다. 이때 인수로 both를 전달하여
      스테이트를 변경한다. 스테이트가 변경되면 즉시 리렌더링이 되면서
      화면의 변화가 생긴다. */
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  );
}

function WriteForm(props){
  return(
    //submit 이벤트리스너를 통해 폼값을 처리한다. 
    <form onSubmit={(e)=>{
      //이벤트리스너에서는 event객체를 매개변수로 받을 수 있다. 
      console.log("이벤트객체e",e);
      //이벤트 객체를 통해 submit 이벤트를 차단한다. 
      e.preventDefault();
      //이벤트의 target 속성을 통해 입력한 값을 읽어온다. 
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      /*부모 컴포넌트에서 프롭스로 전달해준 함수를 호출하여 폼값을
      전달한다.*/
      props.writeAction(title, writer, contents);
    }}>
      <table border='1'>
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer"/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title"/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols="22" rows="3"></textarea></td>
          </tr>
        </tbody>
      </table>
      <input type="submit" value='전송' />
    </form>
  );
}

/*
React Hooks(훅)
: React16.8 부터 새롭게 추가된 기능으로 함수형 컴포넌트에서 State와 
수명주기를 연동할 수 있게 해주는 특수한 함수를 말한다.
훅은 import를 먼저 진행한 후 useXYZ()와 같은 패턴의 함수를 선언하여
사용하면된다. 
*/

/*
useState() : 리엑트에서 상태값을 가지는 state의 값을 변경하거나 초깃값을
  부여할때 사용한다. 이 함수의 반환값은 배열인데 
  0번 요소는 state의 초깃값을 저장하는 변수이고
  1번 요소는 이 값을 변경하는 함수로 사용한다. 
  구조분해할당을 이용해서 좌측항의 배열로 각각 값을 할당한다. 
*/
function App() {
  //message 라는 스테이트 생성
  const [message, setMessage] = useState('폼값 검증 진행중');
  return (
    <div className="App">
      <h2>React - Form 값 처리</h2>
      {/* 작성폼 컴포넌트를 추가하면서 프롭스를 통해 폼값을 받아 콘솔에
      출력하는 함수를 전달한다. */}
      <WriteForm writeAction={(wr, ti, con)=>{
        //콘솔에서 확인
        console.log("Form값" ,wr, ti, con);
        //3개의 모든 값을 입력하면 스테이트를 '완료'로 변경한다. 
        if(wr!=''&&ti!=''&&con!=''){
          //스테이트가 변경되면 리렌더링이 된다. 
          setMessage('폼값 검증 완료');
        }
      }}></WriteForm>
      {/* 스테이트가 변경되면 리렌더링이 되므로 아래 텍스트가 변경되는
      것을 볼수있다. 즉 폼값검증이 완료되었을때 변경된다. */}
      <p>{message}</p>
    </div>
  )
}

export default App;
