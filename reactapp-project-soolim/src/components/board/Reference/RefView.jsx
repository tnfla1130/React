import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase/firestoreConfig';
import {doc,setDoc,getDoc,collection,getDocs,query,orderBy,addDoc,updateDoc,deleteDoc} from 'firebase/firestore';
import { useParams, useNavigate } from "react-router-dom";

function RefView({ posts, onDelete }) {
  const { index } = useParams(); // URL에서 index 받기
  const navigate = useNavigate();

  const post = posts[parseInt(index)];

  if (!post) return <p style={{ textAlign: "center" }}>글을 찾을 수 없습니다.</p>;

  const handleEdit = () => {
    navigate(`/data/edit/${index}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠어요?")) {
      onDelete(post.docId); // docId는 여전히 삭제용으로 사용
      navigate("/data");
    }
  };

  return (
    <div className="board-wrapper">
      <div className="board-container">
        <h2 style={{ marginBottom: "20px", color: "#e0848e" }}>자료 상세보기</h2>
        <table className="board-table">
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan="3">{post.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{post.writer}</td>
              <th>등록일</th>
              <td>{post.regdate}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3" style={{ whiteSpace: "pre-line" }}>{post.content}</td>
            </tr>
            {post.fileUrl && (
              <tr>
                <th>첨부파일</th>
                <td colSpan="3">
                  <a href={post.fileUrl} target="_blank" rel="noopener noreferrer">
                    파일 다운로드
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button className="modal-edit" onClick={handleEdit}>수정</button>
          <button className="modal-cancel" onClick={handleDelete}>삭제</button>
          <button className="modal-submit" onClick={() => navigate("/data")}>목록</button>
        </div>
      </div>
    </div>
  );
}

export default RefView;
