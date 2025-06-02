import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firestoreConfig";

function FreeEdit({ post, closeModal, fetchPosts }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  // 날짜 포맷 함수
  const nowDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.docId) {
    alert("문서 ID가 없어 수정할 수 없습니다.");
    return;
    }
    const newTitle = e.target.title.value;
    const newContent = e.target.content.value;

    try {
      // 기존 문서 ID를 유지해야 덮어쓰기됨
      const postRef = doc(firestore, "FreeBoard", post.docId);
      await setDoc(postRef, {
        id: post.id, // 작성자 ID는 그대로
        title: newTitle,
        content: newContent,
        regdate: nowDate(),
      });
      await fetchPosts(); // 목록 다시 불러오기
      alert("수정 완료!");
      closeModal();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-form">
        <h3>글 수정</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="modal-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            name="content"
            className="modal-textarea"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="modal-submit">수정</button>
            <button type="button" onClick={closeModal} className="modal-cancel">취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FreeEdit;
