import { Link } from 'react-router-dom';

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

export default List;
