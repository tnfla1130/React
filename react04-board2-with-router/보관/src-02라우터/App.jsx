//라우팅 관련 컴포넌트 임포트
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

function List(props) {
  return(<>
    <header>
    <h2>게시판-목록</h2>
   </header>
   <nav>
    {/* 각 링크는 <a>에서 <Link> 컴포넌트로 변경 */}
    {/* <a href="/write">글쓰기</a> */}
    <Link to="/write">글쓰기</Link>
   </nav>
   <article>
    <table id="boardTable">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="cen">1</th>
          <th><a href="/view/1">오늘은 React 공부하는날</a></th>
          <th className="cen">낙짜쌤</th>
          <th className="cen">2030-05-05</th>
        </tr>
        <tr>
          <th className="cen">2</th>
          <th><a href="/view/2">오늘은 Javascript공부해씸</a></th>
          <th className="cen">유겸이</th>
          <th className="cen">2023-03-03</th>
        </tr>
        <tr>
          <th className="cen">3</th>
          <th><a href="/view/3">오늘은 Project해야징</a></th>
          <th className="cen">개똥이</th>
          <th className="cen">2023-05-05</th>
        </tr>
      </tbody>
    </table>
   </article>
  </>);
}

function View(props){
  return(<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a> */}
      <Link to="/list">목록</Link>&nbsp;
      <Link to="/edit">수정</Link>&nbsp;
      <Link to="/delete">삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%" /><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <th>성유겸</th>
          </tr>
          <tr>
            <th>제목</th>
            <th>오늘은 React 공부하는날</th>
          </tr>
          <tr>
            <th>날짜</th>
            <th>2023-05-05</th>
          </tr>
          <tr>
            <th>내용</th>
            <th>열심히 해봅시당<br/>열공 합시당</th>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

function Write(props) {
  return(<>
       <header>
    <h2>게시판-작성</h2>
   </header>
   <nav>
    {/* <a href="/list">목록</a> */}
    <Link to="/list">목록</Link>
   </nav>
   <article>
    <form>
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
          <th><textarea name="contents" cols="22" rows="3"></textarea></th>
        </tr>
      </tbody>
    </table>
    <input type="submit" value="전송" />
    </form>
   </article>
  </>);
}

function NotFound(){
  return(
    <div>
      <h2>Not found</h2>
      <p>
        페이지를 찾을 수 없습니다. <br />
        <Link to='/'>HOME</Link>
      </p>
    </div>
  );
}

function App() {
  return (
      // <h2>라우팅 적용한 게시판</h2>
      /* 라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
      처리해도 된다. 하지만 주로 main.jsx에서 처리하는게 좋다.  */
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* 첫 실행시에는 목록이 렌더링 된다.  */}
            <Route path="/" element={<List></List>}></Route>
            <Route path="/list" element={<List></List>}></Route>
            <Route path="/view" element={<View></View>}></Route>
            <Route path="/write" element={<Write></Write>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
 