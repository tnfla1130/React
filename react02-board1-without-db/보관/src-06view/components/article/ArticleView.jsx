//열람
function ArticleView(props) {
  console.log('선택한게시물',props.selectRow);
  return (
    <article>
    <table id="boardTable">
      <colgroup>
        <col width="30%" /><col width="*" />
      </colgroup>
      <tbody>
        <tr>
          <th>작성자</th>
          <th>{props.selectRow.writer}</th>
        </tr>
        <tr>
          <th>제목</th>
          <th>{props.selectRow.title}</th>
        </tr>
        <tr>
          <th>날짜</th>
          <th>{props.selectRow.date}</th>
        </tr>
        <tr>
          <th>내용</th>
          <th>{props.selectRow.contents}</th>
        </tr>
      </tbody>
    </table>
   </article>
  );
}

export default ArticleView;