import { useState } from "react";
import ModalWindow from './components/ModalWindow';
import ModalEdit from "./components/ModalEdit";

function BoardView(props) {
  return(<>
    {/* 게시판 열람 */}
    <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title">댓글 작성 구현하기</h5>
            <p className="card-text">
                구현할 기능은 댓글작성, 좋아요, 수정, 삭제입니다. <br/>
                기능 구현은 아래 댓글 작성부터 하면 됩니다. 
            </p>
        </div>
    </div>
  </>);
}

const CommentBtn = () => {
  return(<>
    {/* 댓글 작성 버튼 */}
    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
        댓글 작성
    </button>
  </>)
}

function CommentList(props) {
  // console.log(props);
  return (
    <ul className="list-group mt-3">
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <strong>{props.writer}</strong>
            <small className="ms-2">{props.postdate}</small>
          </div>
          <div>
            <button className="btn btn-outline-success btn-sm" 
              onClick={props.onLike}>좋아요 ({props.likes})</button>
            <button className="btn btn-outline-warning btn-sm" 
            data-bs-toggle="modal" data-bs-target="#editModal"
              >수정</button>
            <button className="btn btn-outline-danger btn-sm">삭제</button>
          </div>
        </div>
        <p className="mt-2 mb-0">{props.content}</p>
      </li>
    </ul>
  );
}


function App() {

  const [boardData, setBoardData] = useState([
    {
      idx:1, writer:'낙자쌤',postdate:'2025-05-27',
      content: '내용 블라블라', likes: 0
    }
  ]);

  const handleLike = (idx) => {
    setBoardData(prev =>
      prev.map(item =>
        item.idx === idx ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (<>
    <div className="container mt-4">
      <BoardView/>
      <CommentBtn/>
      <ModalWindow boardData={boardData} setBoardData={setBoardData}/>
      <ModalEdit boardData={boardData} setBoardData={setBoardData}/>
 
      {boardData.map(item => (
        <CommentList 
          key={item.idx}
          writer={item.writer}
          postdate={item.postdate}
          content={item.content}
          likes={item.likes}
          onLike={() => handleLike(item.idx)}/>
      ))}

      {/* {boardData.map(item => (
        <ModalEdit
          key={item.idx}
          writer={item.writer}
          postdate={item.postdate}
          content={item.content}
          likes={item.likes}/>
      ))} */}
    </div>
  </>)
}

export default App
