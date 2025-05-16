import { Link, useParams } from 'react-router-dom';


function Edit(props) {
  //App 컴포넌트에서 전달해준 스테이트와 관련함수를 모두 받아서 상수에 저장
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  const nowDate = props.nowDate;
  const nextNo = props.nextNo;
  var params = useParams();
  console.log('파라미터',params.no);


  return(<>
    <header>
      <h2>게시판-수정</h2>
    </header>
   <nav>
    <Link to="/list">뒤로</Link>
    <Link to="/list">목록</Link>
   </nav>

   <article>
    <form onSubmit={
      (event)=>{
        //submit 이벤트 차단
        event.preventDefault();

        //이벤트객체의 target 속성으로 DOM의 입력값을 읽어옴
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;

        //스테이트, 폼값, 함수의 반환값으로 새롭게 추가할 객체 생성
        let editBoardData = {no:nextNo, title:t, writer:w, contents:c,
            date:nowDate()};
        console.log('수정내용',editBoardData);

        //스프레드 연산자로 기존 배열데이터의 복사본을 생성한다. 
        let copyBoardData = [...boardData];
        for(let i=0; i<copyBoardData.length ; i++){
          //수정할 객체를 찾는다. 
          if(copyBoardData[i].no==nextNo){
            //수정된 내용의 객체로 변경한다. 
            copyBoardData[i] = editBoardData;
            //반복문 탈출
            break;
          }
        }
        //복사본을 통해 스테이트를 변경한다. 
        setBoardData(copyBoardData);
        //수정된 내용 확인을 위해 '열람'화면으로 전환한다. 
        navigate('/list'); 
      }
    }>
    <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <th><input type="text" name="writer"/></th>
          </tr>
          <tr>
            <th>제목</th>
            <th ><input type="text" name="title"/></th>
          </tr>
          <tr>
            <th>내용</th>
            <th><textarea name="contents" rows="3"></textarea></th>
          </tr>
        </tbody>
      </table>
      <input type="submit" value="수정하기" />
    </form>
   </article>
  </>);
}

export default Edit;